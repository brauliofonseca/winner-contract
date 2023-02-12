const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ContractCaller', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const [contractOwner, contractCallerOwner, extraAddr] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('Contract');
    const ContractCaller = await ethers.getContractFactory('ContractCaller');

    const contract = await Contract.connect(contractOwner).deploy();
    const contractCaller = await ContractCaller.connect(contractCallerOwner).deploy();

    await contract.deployed();
    await contractCaller.deployed();

    // console.log('Signer address - contract: ', contractOwner.address);
    // console.log('Signer address - contractCaller: ', extraAddr.address);
    // console.log('Contract: ' + JSON.stringify(await contract))
    // console.log('Contract Caller: ' + JSON.stringify(await contractCaller))
    return { contract, contractCaller, contractOwner, contractCallerOwner, extraAddr};
  }

  it('Should deploy contract with different owner addresses', async function () {
    const { contract, contractCaller } = await loadFixture(deployContractAndSetVariables);
    expect(await contract.signer).to.not.equal(await contractCaller.signer);
  });

  it('Should emit Winner event', async function () {
    const { contract, contractCaller, contractOwner, contractCallerOwner } = await loadFixture(deployContractAndSetVariables);

    if (contractCaller === undefined) {
      console.log("Found errors")
    }
    const transaction = await contractCaller.callAttempt(contract.address);
    const completedTransaction = await transaction.wait()

    console.log("Transaction obj: " + JSON.stringify(completedTransaction))
    expect(completedTransaction.logs[0]).to.not.equal(undefined);
  });

});
