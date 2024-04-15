import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { TrustBlockContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TrustBlockContract.json";
import { Button, Modal, Box } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';

function Feed({ personal, isVerified }) {
  const [posts, setPosts] = useState([]);
  const [isPostBoxOpen, setIsPostBoxOpen] = useState(false);

  const handlePostButtonClick = () => {
    setIsPostBoxOpen(true);
  };

  const handleCloseTweetBox = () => {
    setIsPostBoxOpen(false);
  };

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          newsUrl: allTweets[i].newsUrl,
          text: allTweets[i].text,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          newsUrl: allTweets[i].newsUrl,
          text: allTweets[i].text,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getAllPosts = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TrustBlockContractAddress,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllPosts();
        console.log("newPosts",allTweets);
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const deletePost = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TrustBlockContractAddress,
          Twitter.abi,
          signer
        );

        let deletePostTx = await TwitterContract.deletePost(key, true);
        let allTweets = await TwitterContract.getAllPosts();
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
        {isVerified ? (
          <Button variant="contained" onClick={handlePostButtonClick}>
            Post
          </Button>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", color: "#757575" }}
          >
            <BlockIcon style={{ marginRight: "8px" }} />
            <span style={{ fontSize: "16px" }}>Not verified</span>
          </div>
        )}
      </div>
      <Modal
        open={isPostBoxOpen}
        onClose={handleCloseTweetBox}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: "35%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TweetBox onClose={handleCloseTweetBox} />
        </Box>
      </Modal>
      {/* <TweetBox /> */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.text}
            personal={post.personal}
            onClick={deletePost(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
