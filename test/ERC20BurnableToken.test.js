const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20BurnableToken", function () {
  async function deployERC20BurnableTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC20BurnableToken = await ethers.getContractFactory(
      "ERC20BurnableToken"
    );
    const erc20BurnableToken = await ERC20BurnableToken.deploy(
      otherAccount.address
    );
    await erc20BurnableToken.deployed();

    const instance = erc20BurnableToken.address;

    const problem = ERC20BurnableToken.attach(instance);
    await problem.connect(otherAccount).burn("20000000000000000000");

    return {
      erc20BurnableToken,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("토큰 20개를 소각한다", async function () {
      const { erc20BurnableToken, otherAccount } = await loadFixture(
        deployERC20BurnableTokenFixture
      );

      const totalSupply = await erc20BurnableToken.totalSupply();
      const balance = await erc20BurnableToken.balanceOf(otherAccount.address);

      expect(totalSupply).to.equal("1999999980000000000000000000");
      expect(balance).to.equal("0");
    });
  });
});
