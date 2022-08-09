const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyMinusCalculator = await ethers.getContractFactory(
    "MyMinusCalculator"
  );
  const deploy = await MyMinusCalculator.connect(myAccount).deploy();
  await deploy.deployed();

  const instance = "0x76b489A253aea8FA9e9E41C578B91c37eA821b76";
  const MinusCalculatorProblem = await ethers.getContractFactory(
    "MinusCalculatorProblem"
  );
  const minusCalculatorProblemContract =
    MinusCalculatorProblem.attach(instance);
  const result = await minusCalculatorProblemContract
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
