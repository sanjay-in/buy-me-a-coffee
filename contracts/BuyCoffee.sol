// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

// Errors
error BuyCoffee__NotEnoughMoneyTBuyCoffee();
error BuyCoffee__NotOwner();

contract BuyCoffee {
    struct Memo {
        address from;
        string name;
        string message;
        uint256 amount;
        uint256 timestamp;
    }

    // Events
    event CoffeeBought(
        address indexed from,
        string name,
        string message,
        uint256 amount,
        uint256 timestamp
    );

    // State variables
    address payable immutable i_owner;
    Memo[] public s_memos;

    constructor() {
        i_owner = payable(msg.sender);
    }

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert BuyCoffee__NotOwner();
        _;
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

        s_memos.push(
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

    /**
     * Owner of the contract can withdraw all the funds
     */
    function withdraw() public onlyOwner {
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    // Getter functions

    /**
     * Returns the address of the contract owner
     */
    function getOwner() public view returns(address) {
        return i_owner;
    } 

    function getMemo(uint256 _index) public view returns(Memo memory) {
        return s_memos[_index];
    } 

    function getAllMemos() public view returns(Memo[] memory) {
        return s_memos;
    }
}
