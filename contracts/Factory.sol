// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./masterColab.sol";
import "./MasterChef.sol";
import "hardhat/console.sol";

contract Factory {
    masterColab[] public data;
    MasterChef public master;
    address public masterContract;

    constructor(address _masterContract, address _master) {
        masterContract = _masterContract;
        master = MasterChef(_master);
    }
 
    function createChild() public {
        // console.log('check CreateChild');
        masterColab child = masterColab(Clones.clone(masterContract));
        child.initailize(address(this),address(master)); 
        data.push(child); 
        // console.log('address(child)', address(child)); 
    }  

    function getData() external view returns (masterColab ) {
        uint x = data.length -1;
        return data[x]; 
    }
}
