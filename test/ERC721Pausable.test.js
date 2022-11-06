const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Pausable", function () {
  async function deployERC721PausableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeNFTPausable = await ethers.getContractFactory(
      "Web3OnlineJudgeNFTPausable"
    );
    const web3OnlineJudgeNFTPausable = await Web3OnlineJudgeNFTPausable.connect(
      otherAccount
    ).deploy(owner.address);
    await web3OnlineJudgeNFTPausable.deployed();

    const instance = web3OnlineJudgeNFTPausable.address;

    const problem = Web3OnlineJudgeNFTPausable.attach(instance);
    await problem.connect(owner).pause();

    return {
      web3OnlineJudgeNFTPausable,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("토큰을 멈춘다", async function () {
      const { web3OnlineJudgeNFTPausable, owner } = await loadFixture(
        deployERC721PausableFixture
      );

      const paused = await web3OnlineJudgeNFTPausable.connect(owner).paused();

      expect(paused).to.equal(true);
    });
  });
});
