const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Mintable", function () {
  async function deployERC721MintableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721Mintable = await ethers.getContractFactory("ERC721Mintable");
    const erc721Mintable = await ERC721Mintable.connect(otherAccount).deploy();
    await erc721Mintable.deployed();

    const instance = erc721Mintable.address;
    const creator = otherAccount.address;

    const Web3OnlineJudgeNFTMintable = await ethers.getContractFactory(
      "Web3OnlineJudgeNFTMintable"
    );
    const web3OnlineJudgeNFTMintable = await Web3OnlineJudgeNFTMintable.connect(
      owner
    ).deploy(creator);
    await web3OnlineJudgeNFTMintable.deployed();

    const problem = ERC721Mintable.attach(instance);
    await problem.setToken(web3OnlineJudgeNFTMintable.address);

    return {
      web3OnlineJudgeNFTMintable,
      erc721Mintable,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("문제 생성자가 NFT를 민트할 수 있다", async function () {
      const { web3OnlineJudgeNFTMintable, owner, otherAccount } =
        await loadFixture(deployERC721MintableFixture);

      await web3OnlineJudgeNFTMintable
        .connect(otherAccount)
        .mint(owner.address, 128);

      const ownerOfNft = await web3OnlineJudgeNFTMintable.ownerOf(128);

      expect(ownerOfNft).to.equal(owner.address);
    });

    it("ERC721Mintable에 토큰 주소를 지정한다", async function () {
      const { web3OnlineJudgeNFTMintable, erc721Mintable } = await loadFixture(
        deployERC721MintableFixture
      );

      const token = await erc721Mintable.token();

      expect(token).to.equal(web3OnlineJudgeNFTMintable.address);
    });
  });
});
