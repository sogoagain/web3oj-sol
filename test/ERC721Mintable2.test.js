const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721Mintable2", function () {
  async function deployERC721Mintable2Fixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721Mintable2 = await ethers.getContractFactory("ERC721Mintable2");
    const erc721Mintable2 = await ERC721Mintable2.connect(
      otherAccount
    ).deploy();
    await erc721Mintable2.deployed();

    const instance = erc721Mintable2.address;
    const creator = otherAccount.address;

    const Web3OnlineJudgeNFTMintableAutoIncrementIds =
      await ethers.getContractFactory(
        "Web3OnlineJudgeNFTMintableAutoIncrementIds"
      );
    const web3OnlineJudgeNFTMintableAutoIncrementIds =
      await Web3OnlineJudgeNFTMintableAutoIncrementIds.connect(owner).deploy(
        creator
      );
    await web3OnlineJudgeNFTMintableAutoIncrementIds.deployed();

    const problem = ERC721Mintable2.attach(instance);
    await problem.setToken(web3OnlineJudgeNFTMintableAutoIncrementIds.address);

    return {
      web3OnlineJudgeNFTMintableAutoIncrementIds,
      erc721Mintable2,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("문제 생성자가 NFT를 민트할 수 있다", async function () {
      const {
        web3OnlineJudgeNFTMintableAutoIncrementIds,
        owner,
        otherAccount,
      } = await loadFixture(deployERC721Mintable2Fixture);

      await web3OnlineJudgeNFTMintableAutoIncrementIds
        .connect(otherAccount)
        .mint(owner.address);

      const ownerOfNft =
        await web3OnlineJudgeNFTMintableAutoIncrementIds.ownerOf(0);

      expect(ownerOfNft).to.equal(owner.address);
    });

    it("ERC721Mintable2에 토큰 주소를 지정한다", async function () {
      const { web3OnlineJudgeNFTMintableAutoIncrementIds, erc721Mintable2 } =
        await loadFixture(deployERC721Mintable2Fixture);

      const token = await erc721Mintable2.token();

      expect(token).to.equal(
        web3OnlineJudgeNFTMintableAutoIncrementIds.address
      );
    });

    it("민트 시 자동으로 tokenId가 증가한다", async function () {
      const {
        web3OnlineJudgeNFTMintableAutoIncrementIds,
        owner,
        otherAccount,
      } = await loadFixture(deployERC721Mintable2Fixture);

      await web3OnlineJudgeNFTMintableAutoIncrementIds
        .connect(otherAccount)
        .mint(owner.address);
      await web3OnlineJudgeNFTMintableAutoIncrementIds
        .connect(otherAccount)
        .mint(owner.address);
      await web3OnlineJudgeNFTMintableAutoIncrementIds
        .connect(otherAccount)
        .mint(owner.address);

      const ownerOfNft =
        await web3OnlineJudgeNFTMintableAutoIncrementIds.ownerOf(2);

      expect(ownerOfNft).to.equal(owner.address);
    });
  });
});
