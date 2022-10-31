const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Transfer", function () {
  async function deployERC20TransferFixture() {
    const ERC20Transfer = await ethers.getContractFactory("ERC20Transfer");
    const erc20Transfer = await ERC20Transfer.deploy();
    await erc20Transfer.deployed();

    const instance = erc20Transfer.address;

    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeToken = await ethers.getContractFactory(
      "Web3OnlineJudgeToken"
    );
    const web3OnlineJudgeToken = await Web3OnlineJudgeToken.connect(
      owner
    ).deploy();
    await web3OnlineJudgeToken.deployed();

    await web3OnlineJudgeToken
      .connect(owner)
      .transfer(instance, "20000000000000000000");

    const problem = ERC20Transfer.attach(instance);
    await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);

    return { web3OnlineJudgeToken, erc20Transfer, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("owner가 WEB3OJT 토큰 잔액을 모두 가지고 있다", async function () {
      const { web3OnlineJudgeToken, owner } = await loadFixture(
        deployERC20TransferFixture
      );

      const balance = await web3OnlineJudgeToken.balanceOf(owner.address);

      expect(balance).to.equal("1999999999999999999999999980");
    });

    it("owner가 WEB3OJT 토큰 20개를 문제 인스턴스에 전송한다", async function () {
      const { web3OnlineJudgeToken, erc20Transfer } = await loadFixture(
        deployERC20TransferFixture
      );

      const balance = await web3OnlineJudgeToken.balanceOf(
        erc20Transfer.address
      );

      expect(balance).to.equal("20000000000000000000");
    });

    it("ERC20Transfer의 web3ojt는 web3OnlineJudgeToken의 주소다", async function () {
      const { web3OnlineJudgeToken, erc20Transfer } = await loadFixture(
        deployERC20TransferFixture
      );

      const web3ojt = await erc20Transfer.web3ojt();
      expect(web3OnlineJudgeToken.address).to.equal(web3ojt);
    });
  });
});
