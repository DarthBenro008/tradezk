require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: "https://dry-billowing-paper.matic-testnet.quiknode.pro/5f006cd0d856510b33ca85bf499e413129196977/",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.ETHERSCAN,
    },
  },
};
