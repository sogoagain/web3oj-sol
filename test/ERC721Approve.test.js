const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Approve", function () {
  async function deployERC721ApproveFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFT = await ethers.getContractFactory(
      "Web3OnlineJudgeNFT"
    );
    const web3OnlineJudgeNFT = await Web3OnlineJudgeNFT.connect(owner).deploy();
    await web3OnlineJudgeNFT.deployed();

    await web3OnlineJudgeNFT.connect(owner).safeMint(owner.address, 0);

    const instance = otherAccount.address;

    await web3OnlineJudgeNFT.connect(owner).approve(instance, 0);

    return { web3OnlineJudgeNFT, owner, instance };
  }

  describe("Deployment", function () {
    it("문제 컨트렉트 인스턴스가 NFT를 인출 할 수 있다", async function () {
      const { web3OnlineJudgeNFT, instance } = await loadFixture(
        deployERC721ApproveFixture
      );

      const approvedAddress = await web3OnlineJudgeNFT.getApproved(0);

      expect(approvedAddress).to.equal(instance);
    });
  });
});
