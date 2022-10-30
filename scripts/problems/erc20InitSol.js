const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20InitSol() {
  const instance = "0x80ff6e85bEdd859e8Fb92E120236F3B98f18351B";

  const ERC20Init = await ethers.getContractFactory("ERC20Init");

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeToken = await ethers.getContractFactory(
    "Web3OnlineJudgeToken"
  );
  const web3OnlineJudgeToken = await Web3OnlineJudgeToken.connect(owner).deploy(
    owner.address
  );
  await web3OnlineJudgeToken.deployed();

  const problem = ERC20Init.attach(instance);
  await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);
}

async function main() {
  erc20InitSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
