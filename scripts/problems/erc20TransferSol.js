const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20TransferSol() {
  const instance = "0xfC0c62a4f59dFE8E2324ae0dC02DA77DB8b1Bb6c";

  const ERC20Transfer = await ethers.getContractFactory("ERC20Transfer");

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeToken = await ethers.getContractFactory(
    "Web3OnlineJudgeToken"
  );
  const web3OnlineJudgeToken = await Web3OnlineJudgeToken.connect(
    owner
  ).deploy();
  await web3OnlineJudgeToken.deployed();

  await web3OnlineJudgeToken
    .connect(owner)
    .transfer(instance, "20000000000000000000");

  const problem = ERC20Transfer.attach(instance);
  await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);
}

async function main() {
  erc20TransferSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
