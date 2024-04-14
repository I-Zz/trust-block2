import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from "avataaars2";
import { generateRandomAvatarOptions } from "./avatar";
import { Button } from "@mui/material";
import axios from "axios";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");

  const addTweet = async () => {
    let tweet = {
      tweetText: tweetMessage,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
// export const connect = async () => {
//   await provider.send("eth_requestAccounts", []);
//   return getContract();
// };

// export const getContract = async () => {
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(address, abi, signer);
//   return { signer: signer, contract: contract };
// };

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let twitterTx = await TwitterContract.addTweet(
          tweet.tweetText,
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

    addTweet();

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
          <input
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
