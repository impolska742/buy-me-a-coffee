import { waffle, ethers } from "hardhat";

// Get balance of a particular address.
async function getBalance(address) {
  const balanceBN = await waffle.provider.getBalance(address);
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
      `At ${timestamp} ${tipperName} (${tipperAddress}) said : "${tipperMessage}" `
    );
  }
}

async function main() {}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
