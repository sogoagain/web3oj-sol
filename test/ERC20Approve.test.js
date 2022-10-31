const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Approve", function () {
  async function deployERC20ApproveFixture() {
    const ERC20Approve = await ethers.getContractFactory("ERC20Approve");
    const erc20Approve = await ERC20Approve.deploy();
    await erc20Approve.deployed();

    const instance = erc20Approve.address;

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
      .approve(instance, "20000000000000000000");

    const problem = ERC20Approve.attach(instance);
    await problem.connect(owner).setWeb3ojt(web3OnlineJudgeToken.address);

    return { web3OnlineJudgeToken, erc20Approve, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("owner가 WEB3OJT 토큰 20억개를 모두 가지고 있다", async function () {
      const { web3OnlineJudgeToken, owner } = await loadFixture(
        deployERC20ApproveFixture
      );

      const balance = await web3OnlineJudgeToken.balanceOf(owner.address);

      expect(balance).to.equal("2000000000000000000000000000");
    });

    it("owner가 문제 인스턴스 컨트랙트에게 20 WEB3OJT를 인출할 수 있다", async function () {
      const { web3OnlineJudgeToken, erc20Approve, owner } = await loadFixture(
        deployERC20ApproveFixture
      );

      const allowanceAmount = await web3OnlineJudgeToken.allowance(
        owner.address,
        erc20Approve.address
      );

      expect(allowanceAmount).to.equal("20000000000000000000");
    });

    it("ERC20Approve의 web3ojt는 web3OnlineJudgeToken의 주소다", async function () {
      const { web3OnlineJudgeToken, erc20Approve } = await loadFixture(
        deployERC20ApproveFixture
      );

      const web3ojt = await erc20Approve.web3ojt();
      expect(web3OnlineJudgeToken.address).to.equal(web3ojt);
    });
  });
});
