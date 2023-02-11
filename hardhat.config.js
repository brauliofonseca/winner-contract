require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIV_KEY]
    }
  }
};
