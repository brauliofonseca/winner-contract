// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ContractCaller {
    function callAttempt(address contractAddress) external {
        (bool success, ) = contractAddress.call(abi.encodeWithSignature("attempt()"));
        require(success);
    }
}

