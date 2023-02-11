# Winner Event

This project creates a smart contract that calls another contract on the Goerli network that emits Winner event

Execute the following commands to run on Goerli testnet:
```shell
npx hardhat compile
npx hardhat run --network goerli scripts/deployWinner.js
(NOTE: Remember the address that gets generated from this command)


Run the following commands to call the contract that will emit the Winner event:
npx hardhat console --network goerli
const callerContract = await ethers.getContractFactory("ContractCaller")
const caller = await caller.attach("address from output of deployment command")
await caller.callAttempt("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502")
```
