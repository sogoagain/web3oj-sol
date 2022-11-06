const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721FindSol() {
  const instance = "0xE3d53E07737736FDd40df2E93B7B20e3aF28FCfc";

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeNFTFind = await ethers.getContractFactory(
    "Web3OnlineJudgeNFTFind"
  );
  const web3OnlineJudgeNFTFind = Web3OnlineJudgeNFTFind.attach(instance);

  const result = await web3OnlineJudgeNFTFind
    .connect(owner)
    .transferFrom(owner.address, instance, 529);
  console.log(result);
}

async function main() {
  erc721FindSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
