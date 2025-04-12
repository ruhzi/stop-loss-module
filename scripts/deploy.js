const hre = require("hardhat");

async function main() {
  const StopLossRegistry = await hre.ethers.getContractFactory("StopLossRegistry");
  const contract = await StopLossRegistry.deploy();

  await contract.deployed();

  console.log(`✅ Contract deployed at: ${contract.address}`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
