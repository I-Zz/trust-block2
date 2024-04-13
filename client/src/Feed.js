import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
// import axios from "axios";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";
import contract from "./utils/twitter.abi.json";

function Feed({ personal }) {
  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          contract,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        console.log(allTweets);
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          contract,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getAllTweets();
        console.log(allTweets);
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.tweetText}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
