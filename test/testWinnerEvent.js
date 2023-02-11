const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ContractCaller', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Contract = await ethers.getContractFactory('Contract');
    const ContractCaller = await ethers.getContractFactory('ContractCaller');

    const contract = Contract.deploy();
    const contractCaller = ContractCaller.deploy();

    const [contractOwner, contractCallerOwner] = await ethers.getSigners();

    console.log('Signer address - contract: ', contractOwner.address);
    console.log('Signer address - contractCaller: ', contractCallerOwner.address);
    return { contract, contractCaller, contractOwner, contractCallerOwner };
  }

  it('should deploy correctly', async function () {
    const { contractOwner , contractCallerOwner} = await loadFixture(deployContractAndSetVariables);

    expect(contractOwner.address).to.not.equal(contractCallerOwner.address);
  });

  it('should create Winner', async function () {
    const { contract, contractCaller, contractOwner , contractCallerOwner} = await loadFixture(deployContractAndSetVariables);

    const tx = await contractCaller.callAttempt(contract.address);
    const event = tx.logs.find(log => log.event === "Winner");
    expect(event).to.exist
  });

});
