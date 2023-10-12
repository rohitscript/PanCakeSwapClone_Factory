// SPDX-License-Identifier:MIT
// pragma solidity ^0.8.0;
// import "@openzeppelin/contracts/proxy/Clones.sol";
// import "./MasterChef.sol";
// import "hardhat/console.sol";

// contract Factory  {
//     MasterChef[] public masterChef;
//     Clones[] public clones;
    
//     function createMasterChef()public {
 
   
//      }
    
// }

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./MasterChef.sol";
import "hardhat/console.sol";

contract Factory  {
    // MasterChef[] public masterChef;
     MasterChef[] public data;
     address masterContract;

     constructor(address _masterContract){
         masterContract = _masterContract;
     }

     function createChild() external{
        MasterChef child = MasterChef(Clones.clone(masterContract));
        data.push(child);
     }

     function getData() external view returns(MasterChef[] memory){
         return data;
     }
    
}