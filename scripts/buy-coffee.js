const hre = require("hardhat");

const printBalances = async (addresses) => {
  for (let i = 0; i < addresses.length; i++) {
    const balance = await hre.ethers.provider.getBalance(addresses[i]);
    console.log(
      `Balance for Account ${i}: ${ethers.utils.formatEther(balance)}`
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
  printBalances(addresses);

  // Calling buyCoffee function from funders account
  await buyCoffee
    .connect(funder1)
    .buyCoffee("A", "First message", { value: ethers.utils.parseEther("0.1") });
  await buyCoffee.connect(funder2).buyCoffee("B", "First message", {
    value: ethers.utils.parseEther("0.005"),
  });
  await buyCoffee
    .connect(funder3)
    .buyCoffee("C", "First message", { value: ethers.utils.parseEther("1") });

  console.log("----- Balance after funding -----");
  printBalances(addresses);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
