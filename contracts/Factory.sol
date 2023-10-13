// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MasterChef.sol";
import "../hardhat/console.sol";

contract Factory  {
    // MasterChef[] public masterChef;
     MasterChef[] public data;
     address masterContract;

     constructor(address _masterContract){
         masterContract = _masterContract;
     }

     function createChild() public {
        console.log('check');
        MasterChef child = MasterChef(Clones.clone(masterContract));
        console.log('check');
        data.push(child);
        console.log('address(child)',address(child)); 
        // return address(child);
        // return child;
     }  

     function getData() external view returns(MasterChef){
         return data[0];
     } 
} 