const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;

  log("-------------------------------------------------------");
  log("Deploying BuyMeACoffee contract and waiting for confirmation");

  const buyCoffee = await deploy("BuyCoffee", {
    from: deployer,
    logs: true,
    args: [],
    waitConfirmations: network.config.blockConfirmation || 1,
  });

  log(`BuyMeACoffee deployed at ${buyCoffee.address}`);

  await verify(buyCoffee.address, []);
};

module.exports.tags = ["all", "buyCoffee"];
