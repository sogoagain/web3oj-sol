const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Web3OJTPermitable", function () {
  async function deployWeb3OJTPermitableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Web3OJTPermitable = await ethers.getContractFactory(
      "Web3OJTPermitable"
    );
    const web3OJTPermitable = await Web3OJTPermitable.connect(owner).deploy();
    await web3OJTPermitable.deployed();

    const instance = web3OJTPermitable.address;

    const problem = Web3OJTPermitable.attach(instance);

    const Permit = [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ];

    const name = await problem.name();
    const version = "1";
    const chainId = await owner.getChainId();

    const value = ethers.utils.parseEther("20", "ether");
    const nonce = await problem.nonces(owner.address);
    const deadline = ethers.constants.MaxUint256;

    const data = {
      primaryType: "Permit",
      types: { Permit },
      domain: {
        name,
        version,
        chainId,
        verifyingContract: problem.address,
      },
      message: {
        owner: owner.address,
        spender: otherAccount.address,
        value,
        nonce,
        deadline,
      },
    };

    const digest = await owner._signTypedData(
      data.domain,
      data.types,
      data.message
    );
    const { v, r, s } = ethers.utils.splitSignature(digest);

    const permitTx = await problem
      .connect(otherAccount)
      .permit(owner.address, otherAccount.address, value, deadline, v, r, s);
    await permitTx.wait();

    return {
      web3OJTPermitable,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("permit으로 토큰 지불을 허용한다", async function () {
      const { web3OJTPermitable, owner, otherAccount } = await loadFixture(
        deployWeb3OJTPermitableFixture
      );

      const allowanceAmount = await web3OJTPermitable.allowance(
        owner.address,
        otherAccount.address
      );

      expect(allowanceAmount).to.equal(ethers.utils.parseEther("20", "ether"));

      const beforeOwnerBalance = await web3OJTPermitable.balanceOf(
        owner.address
      );
      const beforeOtherBalance = await web3OJTPermitable.balanceOf(
        otherAccount.address
      );

      expect(beforeOwnerBalance).to.equal(
        ethers.utils.parseEther("2000000000", "ether")
      );
      expect(beforeOtherBalance).to.equal(0);

      await web3OJTPermitable
        .connect(otherAccount)
        .transferFrom(
          owner.address,
          otherAccount.address,
          ethers.utils.parseEther("20", "ether")
        );

      const afterOwnerBalance = await web3OJTPermitable.balanceOf(
        owner.address
      );
      const afterOtherBalance = await web3OJTPermitable.balanceOf(
        otherAccount.address
      );

      expect(afterOwnerBalance).to.equal(
        ethers.utils.parseEther("1999999980", "ether")
      );
      expect(afterOtherBalance).to.equal(
        ethers.utils.parseEther("20", "ether")
      );
    });
  });
});
