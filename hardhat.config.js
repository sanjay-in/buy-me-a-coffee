require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.24" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
};
