// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

contract BuyCoffee {
    struct Memo {
        address from;
        string name;
        string message;
        uint256 amount;
        uint256 timestamp;
    }

    event CoffeeBought(
        address indexed from,
        string name,
        string message,
        uint256 amount,
        uint256 timestamp
    );

    address payable owner;
    Memo[] public memo;

    constructor() {
        owner = payable(msg.sender);
    }
}
