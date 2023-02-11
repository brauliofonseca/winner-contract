// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // const winnerContract = await hre.ethers.getContractFactory("Contract");
  const callingContract = await hre.ethers.getContractFactory("ContractCaller");
  // const winner = await winnerContract.deploy();
  const calling = await callingContract.deploy();

  // await winner.deployed();
  await calling.deployed();
  
  // console.log(`Deployed Winner contract to ${winner.address}`);
  console.log(`Deployed Calling contract to ${calling.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
