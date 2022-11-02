const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721InitSol() {
  const instance = "0x7Ca734139444167d0385c0aa94202b69740D8aAE";
  const token = "0x7ca734139444167d0385c0aa94202b69740d8aae";

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeNFT = await ethers.getContractFactory(
    "Web3OnlineJudgeNFT"
  );
  const web3OnlineJudgeNFT = Web3OnlineJudgeNFT.attach(token);

  const result = await web3OnlineJudgeNFT.connect(owner).approve(instance, 0);
  console.log(result);
}

async function main() {
  erc721InitSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
