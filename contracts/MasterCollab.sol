// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MasterChef.sol";
import "./Factory.sol";
import "hardhat/console.sol";

contract masterColab {
    MasterChef public master;
    Factory public factory;
    address public masterContract;

    constructor(address _factoryAddress) {
        factory = Factory(_factoryAddress);
    }

    function newFarm(uint256 _allocPoint, IBEP20 lpToken, bool _withUpdate) public {
        console.log('check colab newfarm');
        address nfarmAddress = factory.createChild();
        console.log('check colab');
        master = MasterChef(nfarmAddress);
        master.add(_allocPoint, lpToken, _withUpdate);
    }

    function deposit(uint id, uint amount) public {
        master.deposit(id, amount);
    }

    function withdraw(uint id) public {
        master.withdraw(id);
    }
}
