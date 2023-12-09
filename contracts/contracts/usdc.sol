// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20{
    constructor() ERC20("USD Circle", "USDC"){
        _mint(msg.sender,100*10**18);
    }

    function issueToken() public{
        _mint(msg.sender, 100*10**18);
    }
}