// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Structure of Memo
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received. 
    Memo[] memos;  

    // Address of the contract owner 
    // This address will collect all the donations.
    address payable owner;

    // Only runs when contract is deployed.
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     @dev Buy a coffee for contract owner
     @param _name name of the coffee buyer.
     @param _message a nice message from the coffee buyer. 
     */

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0 eth");

        // Add the memo to storage
        memos.push(Memo(
            msg.sender, 
            block.timestamp, 
            _name, 
            _message
        ));

        // Emit the new memo
        emit NewMemo(
            msg.sender, 
            block.timestamp,
            _name,
            _message
        );
    }

    /**
     @dev For owner to withdraw the tips stored in the contract
     @dev Send entire balance stored in the contract to the owner
     */

    function withdrawTips() public {
        require(owner == msg.sender, "Only owner can call this function");
        require(owner.send(address(this).balance), "An error occurred while sending the money to the owner");
    }

    /**
     @dev Retrieve all the memos stored in the blockchain 
     */

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}