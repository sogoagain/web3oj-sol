const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20PausableSol() {
  const instance = "0x7C5D1b1293C000d5CB9c3BdEe41f10934831F999";

  const Web3OJTPausable = await ethers.getContractFactory("Web3OJTPausable");

  const [owner] = await ethers.getSigners();

  const problem = Web3OJTPausable.attach(instance);

  console.log("pause...");
  const result = await problem.connect(owner).pause();
  console.log(result);
}

async function main() {
  erc20PausableSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
