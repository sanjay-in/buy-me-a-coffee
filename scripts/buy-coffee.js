const hre = require("hardhat");

const printBalances = async (addresses) => {
  for (let i = 0; i < addresses.length; i++) {
    const balance = await hre.ethers.provider.getBalance(addresses[i]);
    const formattedEther = await ethers.utils.formatEther(balance);
    console.log(`Balance for Account ${i}: ${formattedEther}`);
  }
};

const printMemos = (memos) => {
  for (let memo of memos) {
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    const amount = hre.ethers.utils.formatEther(memo.amount);
    // converts the timestamp to milliseconds (by multiplying with 1000) and create a new Date object in human readable date
    const timestamp = new Date(memo.timestamp.toNumber() * 1000).toDateString();
    console.log(
      `${name} gave ${amount} ETH on ${timestamp} from address ${from} and said: "${message}"`
    );
  }
};

const main = async () => {
  const [deployer, funder1, funder2, funder3] = await hre.ethers.getSigners();

  const BuyCoffee = await hre.ethers.getContractFactory("BuyCoffee");
  const buyCoffee = await BuyCoffee.deploy();
  await buyCoffee.deployed();
  console.log(`Contract deployed at ${buyCoffee.address}`);

  const addresses = [
    deployer.address,
    funder1.address,
    funder2.address,
    funder3.address,
    buyCoffee.address,
  ];
  console.log("----- Balance before funding -----");
  await printBalances(addresses);

  // Calling buyCoffee function from funders account
  const { parseEther } = hre.ethers.utils;

  await buyCoffee
    .connect(funder1)
    .buyCoffee("A", "First message", { value: parseEther("0.1") });
  await buyCoffee
    .connect(funder2)
    .buyCoffee("B", "Second message", { value: parseEther("0.005") });
  await buyCoffee
    .connect(funder3)
    .buyCoffee("C", "Third message", { value: parseEther("1") });

  console.log("----- Balance after funding -----");
  await printBalances(addresses);

  // Withdraw
  await buyCoffee.connect(deployer).withdraw();

  console.log("----- Balance after withdrawn -----");
  await printBalances(addresses);

  // Get memos
  console.log("----- Memos -----");
  const memos = await buyCoffee.getAllMemos();
  printMemos(memos);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
