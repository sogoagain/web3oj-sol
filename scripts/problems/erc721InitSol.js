const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721InitSol() {
  const instance = "0x3ae75A267E3FDC4A82EB3EDcaa440F7D54940351";

  const ERC721Init = await ethers.getContractFactory("ERC721Init");

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeNFT = await ethers.getContractFactory(
    "Web3OnlineJudgeNFT"
  );
  const web3OnlineJudgeNFT = await Web3OnlineJudgeNFT.connect(owner).deploy();
  console.log("deploy...");

  await web3OnlineJudgeNFT.deployed();
  console.log("deployed...");

  await web3OnlineJudgeNFT.connect(owner).safeMint(owner.address, 0);
  console.log("mint...");

  const problem = ERC721Init.attach(instance);
  const result = await problem
    .connect(owner)
    .setWeb3ojNFT(web3OnlineJudgeNFT.address);
  console.log(result);
  console.log("complete...");
}

async function main() {
  erc721InitSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
