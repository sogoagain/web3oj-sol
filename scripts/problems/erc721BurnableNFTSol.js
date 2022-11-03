const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721BurnableNFTSol() {
  const instance = "0xB81f99718eBd14EB40ba23Af1e14cb71FcD7A9E1";

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeNFTBurnable = await ethers.getContractFactory(
    "Web3OnlineJudgeNFTBurnable"
  );
  const web3OnlineJudgeNFTBurnable =
    Web3OnlineJudgeNFTBurnable.attach(instance);

  const result = await web3OnlineJudgeNFTBurnable.connect(owner).burn(0);
  console.log(result);
}

async function main() {
  erc721BurnableNFTSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
