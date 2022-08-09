const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const [myAccount] = await ethers.getSigners();

  const MyPlusCalculator = await ethers.getContractFactory("MyPlusCalculator");
  const myPlusCalculator = await MyPlusCalculator.connect(myAccount).deploy();
  await myPlusCalculator.deployed();

  const instance = "0x68f20a1350837741c689129EDf9212d49813A15F";
  const PlusCalculatorProblem = await ethers.getContractFactory(
    "PlusCalculatorProblem"
  );
  const plusCalculatorProblem = PlusCalculatorProblem.attach(instance);
  const result = await plusCalculatorProblem
    .connect(myAccount)
    .setPlusCalculator(myPlusCalculator.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
