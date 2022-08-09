const { ethers } = require("hardhat");
const hre = require("hardhat");

async function calculatorSol() {
  const instance = "0x54C7AE7895a5Ce12C0239cF6f60AA15d9DE58C3F";
  const interface = await ethers.getContractFactory(
    "DivisionCalculatorProblem"
  );
  const implementation = await ethers.getContractFactory(
    "MyDivisionCalculator"
  );

  const [myAccount] = await ethers.getSigners();
  const deploy = await implementation.connect(myAccount).deploy();
  await deploy.deployed();

  const contract = interface.attach(instance);
  const result = await contract
    .connect(myAccount)
    .setDivisionCalculator(deploy.address);
  console.log(result);
}

async function main() {
  calculatorSol();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
