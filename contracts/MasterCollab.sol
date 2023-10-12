//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./MasterChef.sol";
import "hardhat/console.sol";

// MasterCollab-->Router(pair exist-->pair create and wrap (masterchef) add/deposit //create pair factory mai hoga Factory-->-->MasterChef.deposit-->Pair

contract MasterCollab{
    MasterChef[] public data;
    address masterContract;
    function deposit()public {
        // _add x _deposit
    }
}