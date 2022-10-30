const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Init", function () {
  async function deployERC20InitFixture() {
    const ERC20Init = await ethers.getContractFactory("ERC20Init");
    const erc20Init = await ERC20Init.deploy();
    await erc20Init.deployed();

    const instance = erc20Init.address;

    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeToken = await ethers.getContractFactory(
      "Web3OnlineJudgeToken"
    );
    const web3OnlineJudgeToken = await Web3OnlineJudgeToken.connect(
      owner
    ).deploy(owner.address);
    await web3OnlineJudgeToken.deployed();

    const problem = ERC20Init.attach(instance);
    await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);

    return { web3OnlineJudgeToken, erc20Init, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("owner가 WEB3OJT 토큰 20억개를 모두 가지고 있다.", async function () {
      const { web3OnlineJudgeToken, owner } = await loadFixture(
        deployERC20InitFixture
      );

      const balance = await web3OnlineJudgeToken.balanceOf(owner.address);

      expect(balance).to.equal("2000000000000000000000000000");
    });

    it("ERC20Init의 web3ojt는 web3OnlineJudgeToken의 주소다", async function () {
      const { web3OnlineJudgeToken, erc20Init } = await loadFixture(
        deployERC20InitFixture
      );

      const web3ojt = await erc20Init.web3ojt();
      expect(web3OnlineJudgeToken.address).to.equal(web3ojt);
    });
  });
});
