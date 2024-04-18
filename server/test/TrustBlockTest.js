const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrustBlock Contract", function () {
  let TrustBlock;
  let trustblock;
  let owner;

  const NUM_TOTAL_NOT_MY_POSTS = 5;
  const NUM_TOTAL_MY_POSTS = 3;
  const NUM_TOTAL_SUBMISSIONS = 0; // Adjust this number based on the number of submissions you want to test

  let totalPosts;
  let totalMyPosts;

  beforeEach(async function () {
    TrustBlock = await ethers.getContractFactory("TrustBlockContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    trustblock = await TrustBlock.deploy();

    totalPosts = [];
    totalMyPosts = [];

    for (let i = 0; i < NUM_TOTAL_NOT_MY_POSTS; i++) {
      let post = {
        'text': 'Random text with id:- ' + i,
        'newsUrl': 'https://www.google.com/',
        'username': addr1,
        'isDeleted': false
      };

      await trustblock.connect(addr1).addPost(post.newsUrl,post.text, post.isDeleted);
      totalPosts.push(post);
    }

    for (let i = 0; i < NUM_TOTAL_MY_POSTS; i++) {
      let post = {
        'username': owner,
        'newsUrl': 'https://www.google.com/',
        'text': 'Random text with id:- ' + (NUM_TOTAL_NOT_MY_POSTS + i),
        'isDeleted': false
      };

      await trustblock.addPost(post.newsUrl,post.text, post.isDeleted);
      totalPosts.push(post);
      totalMyPosts.push(post);
    }
  });

  describe("Add Post", function () {
    it("should emit AddTweet event", async function () {
      let post = {
        'text': 'New Post',
        'newsUrl': 'https://www.google.com/',
        'isDeleted': false
      };
console.log(NUM_TOTAL_MY_POSTS+NUM_TOTAL_NOT_MY_POSTS);
console.log(owner.address);
      await expect(await trustblock.addPost(post.newsUrl,post.text, post.isDeleted)
      ).to.emit(trustblock, 'AddPost').withArgs(owner.address, NUM_TOTAL_NOT_MY_POSTS + NUM_TOTAL_MY_POSTS);
    })
  });

  describe("Add Submission", function () {
    it("should emit add Submission event", async function () {
      let submission = {
        'name': 'John Doe',
        'email': '25Gupta.harsh@gmail.com',
        'workField': 'Technology',
        'qualifications': "Bachelor's Degree",
        'recentWork': 'Some recent work details',
        'experience': '3-5 years',
        'proofs': 'proof1.pdf' // Provide example proof file names
      };
      await expect(await trustblock.submit(
          submission.name,
          submission.email,
          submission.workField,
          submission.qualifications,
          submission.recentWork,
          submission.experience,
          submission.proofs)
      ).to.emit(trustblock,'AddSubmission').withArgs(owner.address, NUM_TOTAL_SUBMISSIONS);
    })
  });

  describe("Get All Submissions", function () {
    it("should return the correct number of total submissions", async function () {
      const submissionsFromChain = await trustblock.getSubmissions();
      expect(submissionsFromChain.length).to.equal(NUM_TOTAL_SUBMISSIONS);
    })
  });

  describe("Get All Posts", function () { 
    it("should return the correct number of total posts", async function () {
      const postsFromChain = await trustblock.getAllPosts();
      expect(postsFromChain.length).to.equal(NUM_TOTAL_NOT_MY_POSTS + NUM_TOTAL_MY_POSTS);
    })

    it("should return the correct number of all my posts", async function () {
      const myPostsFromChain = await trustblock.getMyPosts();
      expect(myPostsFromChain.length).to.equal(NUM_TOTAL_MY_POSTS);
    })
  });

  describe("Delete Post", function () {
    it("should emit delete post event", async function () {
      const POST_ID = 0;
      const POST_DELETED = true;

      await expect(
        trustblock.connect(addr1).deletePost(POST_ID, POST_DELETED)
      ).to.emit(
        trustblock, 'DeletePost'
      ).withArgs(
        POST_ID, POST_DELETED
      );
    })
  });

});
