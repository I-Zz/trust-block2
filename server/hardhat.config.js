require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.24",
  // solidity: "0.8.0",
  solidity: "0.8.4",
  networks: {
    sepolia: {
      // url: process.env.ALCHEMY_SEPOLIA_URL,
      // accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
};
