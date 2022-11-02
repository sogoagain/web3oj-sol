const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Init", function () {
  async function deployERC721InitFixture() {
    const ERC721Init = await ethers.getContractFactory("ERC721Init");
    const erc721Init = await ERC721Init.deploy();
    await erc721Init.deployed();

    const instance = erc721Init.address;

    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFT = await ethers.getContractFactory(
      "Web3OnlineJudgeNFT"
    );
    const web3OnlineJudgeNFT = await Web3OnlineJudgeNFT.connect(owner).deploy();
    await web3OnlineJudgeNFT.deployed();

    await web3OnlineJudgeNFT.connect(owner).safeMint(owner.address, 0);

    const problem = ERC721Init.attach(instance);
    await problem.connect(owner).setWeb3ojNFT(web3OnlineJudgeNFT.address);

    return { web3OnlineJudgeNFT, erc721Init, owner, otherAccount };
  }

  describe("Deployment", function () {
    it(" tokenId 0으로 하여 owner 주소로 mint한다", async function () {
      const { web3OnlineJudgeNFT, erc721Init, owner } = await loadFixture(
        deployERC721InitFixture
      );

      const tokenURI = await web3OnlineJudgeNFT.tokenURI(0);
      const balance = await web3OnlineJudgeNFT.balanceOf(owner.address);
      const web3ojNFT = await erc721Init.web3ojNFT();

      expect(tokenURI).to.equal("https://app.web3oj.com/web3ojnft/0");
      expect(balance).to.equal("1");
      expect(web3ojNFT).to.equal(web3OnlineJudgeNFT.address);
    });
  });
});
