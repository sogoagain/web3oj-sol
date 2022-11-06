const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Find", function () {
  async function deployERC721FindFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFTFind = await ethers.getContractFactory(
      "Web3OnlineJudgeNFTFind"
    );
    const web3OnlineJudgeNFTFind = await Web3OnlineJudgeNFTFind.connect(
      otherAccount
    ).deploy(owner.address, 128);
    await web3OnlineJudgeNFTFind.deployed();

    const instance = web3OnlineJudgeNFTFind.address;

    const problem = Web3OnlineJudgeNFTFind.attach(instance);
    await problem.connect(owner).transferFrom(owner.address, instance, 128);

    return {
      web3OnlineJudgeNFTFind,
      owner,
      otherAccount,
      instance,
    };
  }

  describe("Deployment", function () {
    it("문제 인스턴스 컨트랙트에게 NFT를 송금한다", async function () {
      const { web3OnlineJudgeNFTFind, instance } = await loadFixture(
        deployERC721FindFixture
      );

      const ownerOfNft = await web3OnlineJudgeNFTFind.ownerOf(128);

      expect(ownerOfNft).to.equal(instance);
    });
  });
});
