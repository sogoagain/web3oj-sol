// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Mintable {
    function mint(address to, uint256 amount) external;
}

contract ERC20Mintable {
    IERC20Mintable public token;

    function setToken(address _token) public {
        token = IERC20Mintable(_token);
    }
}

contract Web3OnlineJudgeMintableToken is ERC20, IERC20Mintable {
    address private _minter;

    constructor(address minter) ERC20("Web3 Online Judge Token", "WEB3OJT") {
        _minter = minter;
    }

    function mint(address to, uint256 amount) external override {
        require(msg.sender != _minter, "Do not have permission");
        _mint(to, amount);
    }
}
