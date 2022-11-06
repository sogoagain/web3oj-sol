const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc721Mintable2Sol() {
  const instance = "0x727d5Bb9548A28FD69f5F27a584755EC956caDB8";
  const creator = "0x330D6De2569e68c08439b2C7c8454d5e254E1B56";

  const [owner] = await ethers.getSigners();

  const ERC721Mintable2 = await ethers.getContractFactory("ERC721Mintable2");
  const Web3OnlineJudgeNFTMintableAutoIncrementIds =
    await ethers.getContractFactory(
      "Web3OnlineJudgeNFTMintableAutoIncrementIds"
    );

  const web3OnlineJudgeNFTMintableAutoIncrementIds =
    await Web3OnlineJudgeNFTMintableAutoIncrementIds.connect(owner).deploy(
      creator
    );
  await web3OnlineJudgeNFTMintableAutoIncrementIds.deployed();

  const problem = ERC721Mintable2.attach(instance);
  await problem.setToken(web3OnlineJudgeNFTMintableAutoIncrementIds.address);
}

async function main() {
  erc721Mintable2Sol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
