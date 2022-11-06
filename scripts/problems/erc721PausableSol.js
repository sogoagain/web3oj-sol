const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721PausableSol() {
  const instance = "0x2DB6772c1fBD3fD9CAe098df213076E02352b9E0";

  const Web3OnlineJudgeNFTPausable = await ethers.getContractFactory(
    "Web3OnlineJudgeNFTPausable"
  );

  const [owner] = await ethers.getSigners();

  const problem = Web3OnlineJudgeNFTPausable.attach(instance);
  console.log("pause...");
  const result = await problem.connect(owner).pause();
  console.log(result);
}

async function main() {
  erc721PausableSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
