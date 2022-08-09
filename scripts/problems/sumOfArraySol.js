const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const instance = "0x19bA65E511607663ae0a148A8D8736A8a45C04BA";
  const interface = await ethers.getContractFactory("SumOfArrayProblem");
  const implementation = await ethers.getContractFactory("MySumOfArray");

  const [myAccount] = await ethers.getSigners();
  const deploy = await implementation.connect(myAccount).deploy();
  await deploy.deployed();

  const contract = interface.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setSumOfArrayContract(deploy.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
