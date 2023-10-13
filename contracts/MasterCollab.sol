// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "./MasterChef.sol";
import "./Factory.sol";
import "../hardhat/console.sol";

contract masterColab  {
    // MasterChef[] public masterChef;
     MasterChef public master;
     Factory public factory;
     address masterContract;

     function newFarm(uint256 allocPoint, IBEP20 lpToken, bool _withUpdate) public{
       MasterChef nfarm;
       console.log('check colab');
       factory.createChild();
console.log('check colab');
        nfarm = factory.getData();

        master = nfarm;
        console.log('check colab');
        master.add(_allocPoint, lpToken, withUpdate);
     }

     function deposit(uint id,uint amount) public{
        master.deposit(id,amount);
     }
     function withdraw(uint id,uint amount) public{
        master.withdraw(id,amount);
     }
 
} 