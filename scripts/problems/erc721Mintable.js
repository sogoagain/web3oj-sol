const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721MintableSol() {
  const instance = "0x3435A6f5F8cBAeE5b86c4DEB05F7941610971440";
  const creator = "0x93515901b550c49F3F149820c8cE36541e092d1e";

  const [owner] = await ethers.getSigners();

  const ERC721Mintable = await ethers.getContractFactory("ERC721Mintable");
  const Web3OnlineJudgeNFTMintable = await ethers.getContractFactory(
    "Web3OnlineJudgeNFTMintable"
  );

  const web3OnlineJudgeNFTMintable = await Web3OnlineJudgeNFTMintable.connect(
    owner
  ).deploy(creator);
  await web3OnlineJudgeNFTMintable.deployed();

  const problem = ERC721Mintable.attach(instance);
  await problem.setToken(web3OnlineJudgeNFTMintable.address);
}

async function main() {
  erc721MintableSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
