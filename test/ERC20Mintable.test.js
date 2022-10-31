const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Mintable", function () {
  async function deployERC20MintableFixture() {
    const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");
    const erc20Mintable = await ERC20Mintable.deploy();
    await erc20Mintable.deployed();

    const instance = erc20Mintable.address;

    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OnlineJudgeMintableToken = await ethers.getContractFactory(
      "Web3OnlineJudgeMintableToken"
    );
    const web3OnlineJudgeMintableToken =
      await Web3OnlineJudgeMintableToken.connect(owner).deploy(
        otherAccount.address
      );
    await web3OnlineJudgeMintableToken.deployed();

    const problem = ERC20Mintable.attach(instance);
    await problem.connect(owner).setToken(web3OnlineJudgeMintableToken.address);

    return { web3OnlineJudgeMintableToken, erc20Mintable, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("생성시 넘겨받은 address가 ERC-20을 mint 할 수 있다", async function () {
      const { web3OnlineJudgeMintableToken, otherAccount } = await loadFixture(
        deployERC20MintableFixture
      );

      await web3OnlineJudgeMintableToken.mint(
        otherAccount.address,
        "2000000000000000000000000000"
      );

      const balance = await web3OnlineJudgeMintableToken.balanceOf(
        otherAccount.address
      );

      expect(balance).to.equal("2000000000000000000000000000");
    });
  });
});
