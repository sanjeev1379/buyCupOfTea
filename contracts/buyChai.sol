// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract buyChai {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCupOfTea(string memory _name, string memory _message) public payable{
        require(msg.value > 0, "A Cup of Tea Price must be gretter then 0.");
        owner.transfer(msg.value);
        memos.push(
            Memo({
                name: _name,
                message: _message,
                timestamp: block.timestamp,
                from: msg.sender
            })
        );
    }

    function getAllTransaction() public view returns(Memo[] memory) {
        return memos;
    }
}