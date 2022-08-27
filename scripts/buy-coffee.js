const { ethers } = require("hardhat");

// Get balance of a particular address.
async function getBalance(address) {
  const balanceBN = await ethers.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBN);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance : `, await getBalance(address));
    idx++;
  }
}

// Prints all the memos
function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipperName = memo.name;
    const tipperMessage = memo.message;
    const tipperAddress = memo.from;

    console.log(
      `At ${timestamp}, ${tipperName} (${tipperAddress}) said : "${tipperMessage}" `
    );
  }
}

async function main() {
  // Get example accounts.
  const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

  // Get the contract to deploy.
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");

  // Deploy contract.
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee is deployed to ", buyMeACoffee.address);

  const addresses = [
    owner.address,
    tipper1.address,
    tipper2.address,
    tipper3.address,
    buyMeACoffee.address,
  ];

  // Check the balances before the coffee purchase.
  console.log("<--- Before Coffee Purchase --->");
  console.log("<--- Start --->");
  await printBalances(addresses);
  console.log("<---- End ---->");

  // Buy a few coffees for the owner.

  const tip = { value: ethers.utils.parseEther("1") };

  await buyMeACoffee
    .connect(tipper1)
    .buyCoffee("tipper1", "tipper1 buys coffee", tip);
  await buyMeACoffee
    .connect(tipper2)
    .buyCoffee("tipper2", "tipper2 buys coffee", tip);
  await buyMeACoffee
    .connect(tipper3)
    .buyCoffee("tipper3", "tipper3 buys coffee", tip);

  // Check balances after coffee purchase
  console.log("<--- After Coffee Purchase --->");
  console.log("<--- Start --->");
  await printBalances(addresses);
  console.log("<---- End ---->");

  // Withdraw funds.
  await buyMeACoffee.connect(owner).withdrawTips();

  // Check balances after withdraw.
  console.log("<--- After Withdraw Tips --->");
  console.log("<--- Start --->");
  await printBalances(addresses);
  console.log("<---- End ---->");

  // Read all the memos left for the owner.
  const memos = await buyMeACoffee.connect(owner).getMemos();
  console.log("<--- Memos --->");
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
