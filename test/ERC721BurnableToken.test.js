const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3OnlineJudgeNFTBurnable", function () {
  async function deployWeb3OnlineJudgeNFTBurnableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFTBurnable = await ethers.getContractFactory(
      "Web3OnlineJudgeNFTBurnable"
    );
    const web3OnlineJudgeNFTBurnable = await Web3OnlineJudgeNFTBurnable.deploy(
      owner.address
    );
    await web3OnlineJudgeNFTBurnable.deployed();

    const instance = web3OnlineJudgeNFTBurnable.address;

    const problem = Web3OnlineJudgeNFTBurnable.attach(instance);
    await problem.connect(owner).burn(0);

    return {
      web3OnlineJudgeNFTBurnable,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("TokenId 0인 NFT를 소각한다", async function () {
      const { web3OnlineJudgeNFTBurnable, owner } = await loadFixture(
        deployWeb3OnlineJudgeNFTBurnableFixture
      );

      console.log(ethers.constants.AddressZero);

      const ownerBalance = await web3OnlineJudgeNFTBurnable.balanceOf(
        owner.address
      );

      expect(ownerBalance).to.equal(0);
    });
  });
});
