const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const instance = "0x68f20a1350837741c689129EDf9212d49813A15F";
  const interface = await ethers.getContractFactory("PlusCalculatorProblem");
  const implementation = await ethers.getContractFactory("MyPlusCalculator");

  const [myAccount] = await ethers.getSigners();
  const deploy = await implementation.connect(myAccount).deploy();
  await deploy.deployed();

  const contract = interface.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setPlusCalculator(deploy.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
