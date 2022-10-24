const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20InitSol() {
  const instance = "0x6E33eAb72780cD6E56f873132227d5620e3117a8";

  const erc20Init = await ethers.getContractFactory("ERC20Init");
  const web3OnlineJudgeToken = await ethers.getContractFactory(
    "Web3OnlineJudgeToken"
  );

  const [myAccount] = await ethers.getSigners();

  const ect20InitDeploy = await erc20Init.connect(myAccount).deploy();
  await ect20InitDeploy.deployed();

  const web3OnlineJudgeTokenDeploy = await web3OnlineJudgeToken
    .connect(myAccount)
    .deploy();
  await web3OnlineJudgeTokenDeploy.deployed();

  const contract = ect20InitDeploy.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setWeb3ojt("0x9bCaDD1C7239c42137600d945272398Af018bcB0");
  console.log(result);
}

async function main() {
  erc20InitSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
