// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3OnlineJudgeToken is ERC20 {
    constructor() ERC20("Web3 Online Judge Token", "WEB3OJT") {
        _mint(msg.sender, 2000000000 * 10**decimals());
    }
}
