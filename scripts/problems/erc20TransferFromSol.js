const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20TransferFromSol() {
  const instance = "0x5Ad280Ea22a7213Ef6d656B7d929Ac231c73beE0";

  const ERC20TransferFrom = await ethers.getContractFactory(
    "ERC20TransferFrom"
  );

  const [owner] = await ethers.getSigners();

  const problem = ERC20TransferFrom.attach(instance);
  await problem
    .connect(owner)
    .transferFrom(
      "0x85ba85216cc19d106f82e7d605221d4cf7b6e2d3",
      owner.address,
      "20000000000000000000"
    );
  console.log("transferFrom...");
}

async function main() {
  erc20TransferFromSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
