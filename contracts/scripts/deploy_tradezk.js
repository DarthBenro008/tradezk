// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Tradezk = await hre.ethers.getContractFactory("Tradezk");
  const tradezk = await Tradezk.deploy("0xAf729D03090e5586B48F6e600ac8B5aC7959F8A7", "0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa"); // usdc testnet, push protocol


  await tradezk.waitForDeployment();
 

  console.log(
    `TradeZK deployed to ${tradezk.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
