const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20MintableSol() {
  const instance = "0x362eF80bDd5Ec310fF3F67C9099287fDA5996536";

  const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeMintableToken = await ethers.getContractFactory(
    "Web3OnlineJudgeMintableToken"
  );
  const web3OnlineJudgeMintableToken =
    await Web3OnlineJudgeMintableToken.connect(owner).deploy(instance);
  console.log("deploy...");

  await web3OnlineJudgeMintableToken.deployed();
  console.log("deployed...");

  const problem = ERC20Mintable.attach(instance);
  await problem.connect(owner).setToken(web3OnlineJudgeMintableToken.address);
  console.log("setToken...");
}

async function main() {
  erc20MintableSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
