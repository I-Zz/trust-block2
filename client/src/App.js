import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TrustBlockContractAddress } from "./config.js";
import Twitter from "./utils/TrustBlockContract.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const sepoliaChainId = "0xaa36a7";

      if (chainId !== sepoliaChainId) {
        alert("You are not connected to the Sepolia Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const TwitterContract = new ethers.Contract(
        TrustBlockContractAddress,
        Twitter.abi,
        signer
      );
      let allTweets = await TwitterContract.getSubmissions();
      console.log("get all submissions: ", allTweets);
      let listWallets = [];
      for (let i = 0; i < allTweets.length; i++) {
        console.log(allTweets[i][1]);
        console.log(typeof allTweets[i][1]);
        listWallets.push(allTweets[i][1]);
      }
      for (let i = 0; i < accounts.length; i++) {
        console.log("checking for verification for wallet: ", accounts[i]);
        console.log(typeof accounts[i]);
        for (let j = 0; j < listWallets.length; j++) {
          console.log(listWallets[j], accounts[i]);
          if (listWallets[j].toLowerCase() === accounts[i]) {
            setIsVerified(true);
            console.log("account verified!!!");
            break;
          }
        }

        // if (listWallets.includes(accounts[i])) {
        //   setIsVerified(true);
        //   console.log('account verified!!!');
        //   break;
        // }
      }
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:" + chainId);

    const sepoliaChainId = "0xaa36a7";

    if (chainId !== sepoliaChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  });

  return (
    // BEM
    <div>
      {currentAccount === "" ? (
        <button
          className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar isVerified={isVerified} setIsVerified={setIsVerified} />
          <Feed isVerified={isVerified} />
          <Widgets />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the Sepolia Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </div>
  );
}

export default App;
