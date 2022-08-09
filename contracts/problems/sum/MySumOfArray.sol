// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SumOfArrayProblem.sol";

contract MySumOfArray is ISumOfArray {
    function sum(uint256[] memory arr)
        external
        pure
        override
        returns (uint256 result)
    {
        for (uint256 i; i < 100; i++) {
            result += arr[i];
        }
    }
}
