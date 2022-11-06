const { ethers } = require("hardhat");
const hre = require("hardhat");

async function erc20PermitableSol() {
  const instance = "0x2C62497208C6560F41eb96447f3c3fBFeec36be5";

  const Web3OJTPermitable = await ethers.getContractFactory(
    "Web3OJTPermitable"
  );

  const [owner] = await ethers.getSigners();

  const problem = Web3OJTPermitable.attach(instance);

  console.log("permit...");

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
      spender: instance,
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

  console.log({ v, r, s });

  const permitTx = await problem.permit(
    owner.address,
    instance,
    value,
    deadline,
    v,
    r,
    s
  );
  await permitTx.wait();

  console.log("complete...");
}

async function main() {
  erc20PermitableSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
