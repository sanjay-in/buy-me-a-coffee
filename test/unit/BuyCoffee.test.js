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

          const accounts = await ethers.getSigners();
          const fundingContract = await buyCoffee.connect(accounts[1]);
          await fundingContract.buyCoffee(nameOfTheFunder, funderMessage, {
            value: fundValue,
          });

          const contractBalanceAfterFunded =
            await buyCoffee.provider.getBalance(buyCoffee.address);
          assert.equal(contractBalanceAfterFunded.toString(), fundValue);

          const transactionResponse = await buyCoffee.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);
          const ownerBalanceAfterWithdraw = await buyCoffee.provider.getBalance(
            deployer
          );

          assert.equal(
            ownerBalanceAfterWithdraw.add(gasCost).toString(),
            startingOwnerBalance.add(fundValue).toString()
          );
        });
      });

      describe("getAllMemos", () => {
        it("checks to see if we recieve all memos", async () => {
          const [deployer, account1, account2, account3] =
            await ethers.getSigners();

          const account1Name = "A";
          const account2Name = "B";
          const account3Name = "C";
          const account1Msg = "This is account 1 msg";
          const account2Msg = "This is account 2 msg";
          const account3Msg = "This is account 3 msg";
          const account1Amount = ethers.utils.parseEther("0.01");
          const account2Amount = ethers.utils.parseEther("0.001");
          const account3Amount = ethers.utils.parseEther("0.51");

          await buyCoffee
            .connect(account1)
            .buyCoffee(account1Name, account1Msg, { value: account1Amount });
          await buyCoffee
            .connect(account2)
            .buyCoffee(account2Name, account2Msg, { value: account2Amount });
          await buyCoffee
            .connect(account3)
            .buyCoffee(account3Name, account3Msg, { value: account3Amount });

          const memos = await buyCoffee.getAllMemos();

          assert.equal(memos[0].name, account1Name);
          assert.equal(memos[0].message, account1Msg);
          assert.equal(memos[0].amount.toString(), account1Amount.toString());

          assert.equal(memos[1].name, account2Name);
          assert.equal(memos[1].message, account2Msg);
          assert.equal(memos[1].amount.toString(), account2Amount.toString());

          assert.equal(memos[2].name, account3Name);
          assert.equal(memos[2].message, account3Msg);
          assert.equal(memos[2].amount.toString(), account3Amount.toString());
        });
      });
    });
