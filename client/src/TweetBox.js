import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from "avataaars2";
import { generateRandomAvatarOptions } from "./avatar";
import { Button } from "@mui/material";
import axios from "axios";
import { TrustBlockContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TrustBlockContract.json";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");

  const addPost = async () => {
    let tweet = {
      newsUrl: tweetImage,
      text: tweetMessage, // Assuming tweetMessage is defined elsewhere
      isDeleted: false,
    };
  
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
  
        let twitterTx = await TwitterContract.addPost(
          tweet.newsUrl,
          tweet.text, // Corrected: use 'text' property of the tweet object
          tweet.isDeleted
        );
  
        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Post", error);
    }
  };
  
  const sendTweet = (e) => {
    e.preventDefault();

    addPost();

    setTweetMessage("");
    setTweetImage("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="popup-overlay">
    <div className="popup-content">
    <div className="tweetBox">
      <form>
        <div className="form-group">
          {/* <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...avatarOptions}
          /> */}
          <textarea
            className="tweetBox__imageInput"
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="Share your opinion: "
            type="text"
          />
        </div>
        <div className="form-group">
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Enter News URL"
          type="text"
        />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default TweetBox;
