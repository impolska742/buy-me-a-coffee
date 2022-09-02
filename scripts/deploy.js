const hre = require("hardhat");

async function main() {
  // Get the contract to deploy.
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");

  // Deploy contract.
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();

  console.log("BuyMeACoffee is deployed to ", buyMeACoffee.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
