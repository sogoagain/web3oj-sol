const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721TransferFrom", function () {
  async function deployERC721TransferFromFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFT = await ethers.getContractFactory(
      "Web3OnlineJudgeNFT"
    );
    const web3OnlineJudgeNFT = await Web3OnlineJudgeNFT.connect(owner).deploy();
    await web3OnlineJudgeNFT.deployed();

    await web3OnlineJudgeNFT.connect(owner).safeMint(owner.address, 0);

    const instance = otherAccount.address;

    await web3OnlineJudgeNFT.connect(owner).approve(otherAccount.address, 0);

    await web3OnlineJudgeNFT
      .connect(otherAccount)
      .transferFrom(owner.address, otherAccount.address, 0);

    return { web3OnlineJudgeNFT, owner, otherAccount, instance };
  }

  describe("Deployment", function () {
    it("otherAccount가 NFT를 인출한다", async function () {
      const { web3OnlineJudgeNFT, otherAccount } = await loadFixture(
        deployERC721TransferFromFixture
      );

      const balance = await web3OnlineJudgeNFT.balanceOf(otherAccount.address);

      expect(balance).to.equal(1);
    });
  });
});
