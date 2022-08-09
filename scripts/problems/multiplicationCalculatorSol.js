const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const instance = "0x5592F9748250adaEB79Cf9d0A9760eb7687b7D9C";
  const interface = await ethers.getContractFactory(
    "MultiplicationCalculatorProblem"
  );
  const implementation = await ethers.getContractFactory(
    "MyMultiplicationCalculator"
  );

  const [myAccount] = await ethers.getSigners();
  const deploy = await implementation.connect(myAccount).deploy();
  await deploy.deployed();

  const contract = interface.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setMultiplicationCalculator(deploy.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
