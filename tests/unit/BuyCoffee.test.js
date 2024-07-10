const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BuyCoffee", () => {
      let buyCoffee;
      let deployer;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        buyCoffee = await ethers.getContract("BuyCoffee", deployer);
      });

      describe("constructor", () => {
        it("sets the deployer correctly", async () => {
          const ownerAddress = await buyCoffee.i_owner;
          console.log("ownerAddress", ownerAddress);
          console.log("deployer", deployer);
          assert.equal(ownerAddress, deployer);
        });
      });
    });
