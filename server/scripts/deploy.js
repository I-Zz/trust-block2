const main = async () => {
  const contractFactory = await ethers.getContractFactory("TrustBlockContract");
  const contract = await contractFactory.deploy();
  // await contract.deployed();

  console.log("Contract deployed to (address): ", contract.address);
  console.log("Contract deployed to (target): ", contract.target);
  // console.log("Contract", contract);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
