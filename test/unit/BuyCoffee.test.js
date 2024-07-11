const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BuyCoffee", () => {
      let buyCoffee;
      let deployer;
      const nameOfTheFunder = "Funder1";
      const funderMessage = "Test message for funder1";
      const fundValue = ethers.utils.parseEther("0.01");

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        buyCoffee = await ethers.getContract("BuyCoffee", deployer);
      });

      describe("constructor", () => {
        it("sets the deployer correctly", async () => {
          const ownerAddress = await buyCoffee.getOwner();

          assert.equal(ownerAddress, deployer);
        });

        describe("buyCoffee", () => {
          it("throws error when funded 0", async () => {
            await expect(
              buyCoffee.buyCoffee(nameOfTheFunder, funderMessage, {
                value: 0,
              })
            ).to.be.revertedWith("BuyCoffee__NotEnoughMoneyTBuyCoffee");
          });

          it("adds funders to the array", async () => {
            await expect(
              buyCoffee.buyCoffee(nameOfTheFunder, funderMessage, {
                value: fundValue,
              })
            ).to.emit(buyCoffee, "CoffeeBought");

            const funderMemo = await buyCoffee.getMemo(0);

            assert.equal(funderMemo.from, deployer);
            assert.equal(funderMemo.name, nameOfTheFunder);
            assert.equal(funderMemo.message, funderMessage);
            assert.equal(funderMemo.amount.toString(), fundValue.toString());
          });
        });
      });

      describe("withdraw", () => {
        it("expects to throw error when not owner tries to withdraw", async () => {
          const accounts = await ethers.getSigners();
          const buyCoffeeConnectedContract = await buyCoffee.connect(
            accounts[1]
          );
          await expect(
            buyCoffeeConnectedContract.withdraw()
          ).to.be.revertedWith("BuyCoffee__NotOwner");
        });

        it("checks the balance of contract before and after funded", async () => {
          const startingContractBalance = await buyCoffee.provider.getBalance(
            buyCoffee.address
          );
          const startingOwnerBalance = await buyCoffee.provider.getBalance(
            deployer
          );

          assert.equal(startingContractBalance.toString(), 0);

          await buyCoffee.buyCoffee(nameOfTheFunder, funderMessage, {
            value: fundValue,
          });

          const contractBalanceAfterFunded =
            await buyCoffee.provider.getBalance(buyCoffee.address);

          assert.equal(contractBalanceAfterFunded.toString(), fundValue);
        });
      });
    });
