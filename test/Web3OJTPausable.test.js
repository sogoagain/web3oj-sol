const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3OJTPausable", function () {
  async function deployWeb3OJTPausableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OJTPausable = await ethers.getContractFactory("Web3OJTPausable");
    const web3OJTPausable = await Web3OJTPausable.deploy(otherAccount.address);
    await web3OJTPausable.deployed();

    const instance = web3OJTPausable.address;

    const problem = Web3OJTPausable.attach(instance);
    await problem.connect(otherAccount).pause();

    return {
      web3OJTPausable,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("토큰을 멈춘다", async function () {
      const { web3OJTPausable, owner, otherAccount } = await loadFixture(
        deployWeb3OJTPausableFixture
      );

      try {
        await web3OJTPausable
          .connect(owner)
          .transfer(otherAccount.address, "20000000000000000000");
      } catch (err) {
        expect(err.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Pausable: paused'"
        );
      }
    });
  });
});
