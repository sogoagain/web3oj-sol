const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const instance = "0x76b489A253aea8FA9e9E41C578B91c37eA821b76";
  const interface = await ethers.getContractFactory("MinusCalculatorProblem");
  const implementation = await ethers.getContractFactory("MyMinusCalculator");

  const [myAccount] = await ethers.getSigners();
  const deploy = await implementation.connect(myAccount).deploy();
  await deploy.deployed();

  const contract = interface.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setMinusCalculator(deploy.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
