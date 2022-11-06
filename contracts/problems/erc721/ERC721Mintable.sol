// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IERC721Mintable {
    function mint(address to, uint256 tokenId) external;
}

contract ERC721Mintable {
    IERC721Mintable public token;

    function setToken(address _token) public {
        token = IERC721Mintable(_token);
    }
}

contract Web3OnlineJudgeNFTMintable is ERC721, AccessControl, IERC721Mintable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address minter) ERC721("Web3 Online Judge NFT", "WEB3OJNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, minter);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://app.web3oj.com/web3ojnft/";
    }

    function mint(address to, uint256 tokenId)
        public
        override
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
