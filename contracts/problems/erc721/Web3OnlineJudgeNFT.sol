// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3OnlineJudgeNFT is ERC721, Ownable {
    constructor() ERC721("Web3 Online Judge NFT", "WEB3OJNFT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://app.web3oj.com/web3ojnft/";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
