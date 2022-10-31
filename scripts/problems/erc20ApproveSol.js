const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20ApproveSol() {
  const instance = "0x4f62a0Ab6f44cCa914f6B5fCd7165633517972e1";

  const ERC20Approve = await ethers.getContractFactory("ERC20Approve");

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeToken = await ethers.getContractFactory(
    "Web3OnlineJudgeToken"
  );
  const web3OnlineJudgeToken = await Web3OnlineJudgeToken.connect(
    owner
  ).deploy();
  console.log("deploy...");

  await web3OnlineJudgeToken.deployed();
  console.log("deployed...");

  await web3OnlineJudgeToken
    .connect(owner)
    .approve(instance, "20000000000000000000");
  console.log("approve...");

  const problem = ERC20Approve.attach(instance);
  await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);
  console.log("setWeb3ojt...");
}

async function main() {
  erc20ApproveSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
