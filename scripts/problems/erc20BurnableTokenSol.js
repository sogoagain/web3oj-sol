const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20BurnableTokenSol() {
  const instance = "0x267EC89155Ec67628d5cAf8463867De33F419C2E";

  const ERC20BurnableToken = await ethers.getContractFactory(
    "ERC20BurnableToken"
  );

  const [owner] = await ethers.getSigners();

  const problem = ERC20BurnableToken.attach(instance);
  const result = await problem.connect(owner).burn("20000000000000000000");
  console.log("burn...");
  console.log(result);
}

async function main() {
  erc20BurnableTokenSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
