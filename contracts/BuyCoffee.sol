// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

error BuyCoffee__NotEnoughMoneyTBuyCoffee();

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
    Memo[] public memos;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * Buys coffee for the owner
     * @param _name name of the purchaser of coffee
     * @param _message message from the purchaser
     */
    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        if (msg.value <= 0) {
            revert BuyCoffee__NotEnoughMoneyTBuyCoffee();
        }

        memos.push(
            Memo(msg.sender, _name, _message, msg.value, block.timestamp)
        );

        emit CoffeeBought(
            msg.sender,
            _name,
            _message,
            msg.value,
            block.timestamp
        );
    }
}
