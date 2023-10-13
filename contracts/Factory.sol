// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MasterChef.sol";
import "hardhat/console.sol";

contract Factory {
    MasterChef[] public data;
    address public masterContract;

    constructor(address _masterContract) {
        masterContract = _masterContract;
    }

    function createChild() public returns (address) {
        // console.log('check CreateChild');
        MasterChef child = MasterChef(Clones.clone(masterContract));
        // console.log('check');
        data.push(child);
        console.log('address(child) : ', address(child)); 
        return address(child);
    }  

    function getData() external view returns (address) {
        return address(data[0]);
    }
}
