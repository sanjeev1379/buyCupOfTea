// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for(const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalances(address));
    counter++;
  }  
}

async function consoleMemos(memos) {
  for(const memo of memos) {
    console.log(`At ${memo.timestamp}, name ${memo.name}, address ${memo.from}, message ${memo.message}`);
  }
}

async function main() {
  const [owner, from1, from2] =  await hre.ethers.getSigners();
  const buyChai = await hre.ethers.getContractFactory("buyChai");
  const contract =  await buyChai.deploy();

  await contract.deployed();
  console.log("Address of contact: ", contract.address);

  console.log("==========================");

  const addresses = [owner.address, from1.address, from2.address];
  console.log("Before buying CHAI");
  await consoleBalances(addresses);

  const amount = {
    value: hre.ethers.utils.parseEther("1")
  };
  await contract.connect(from1).buyCupOfTea("from1", "very nice chai", amount);
  await contract.connect(from2).buyCupOfTea("from1", "excellent chai", amount);

  console.log("==========================");
  
  console.log("After buying CHAI");
  await consoleBalances(addresses);

  console.log("==========================");

  console.log("Memos:");
  const memos = await contract.getAllTransaction();
  await consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
