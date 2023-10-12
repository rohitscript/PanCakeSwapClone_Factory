// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MasterChef.sol";
import "hardhat/console.sol";

contract Factory  {
    // MasterChef[] public masterChef;
    string public name="rohit";
     function createMasterChef()public view {
 
    console.log(name);
     }
    
}