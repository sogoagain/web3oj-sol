const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721TransferFromSol() {
  const instance = "0x9331007fC3b82fe6243609488acE151F5272118d";
  const otherAccount = "0x9222b2a3ff735e8368bc1bb56817665ad8dbef20";

  const [owner] = await ethers.getSigners();

  const Web3OnlineJudgeNFT = await ethers.getContractFactory(
    "Web3OnlineJudgeNFT"
  );
  const web3OnlineJudgeNFT = Web3OnlineJudgeNFT.attach(instance);

  const result = await web3OnlineJudgeNFT
    .connect(owner)
    .transferFrom(otherAccount, owner.address, 0);
  console.log(result);
}

async function main() {
  erc721TransferFromSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
