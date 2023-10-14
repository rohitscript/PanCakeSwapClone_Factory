// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Foundation {
    string public name;
    address public owner;

    constructor(
        string memory _name,
        address _owner
    )  {
        name = _name;
        owner = _owner;
    }
    
}