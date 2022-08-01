const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()/10**18).toString());

  const TokenFactory = await hre.ethers.getContractFactory("Token");
  const token = await TokenFactory.deploy();
  await token.deployed()

  console.log('Token deployed to:', token.address);

  // await token.transfer('0x123', web3.utils.toWei('9000000', 'ether'))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
