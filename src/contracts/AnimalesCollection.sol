// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Strings.sol";
contract collection is ERC1155 {

    address private owner;
    uint8 private usersWhitelisted = 0;
    string private _uri = "https://gateway.pinata.cloud/ipfs/QmTgeeceGyX53PGdQC1FsKWdwFmBHwB1GNVx7CpchndrxD";
    uint256 private royaltie = (msg.value*2)/100;
    
    mapping(uint256 => string) _tokenURI;
    mapping(address => bool) _isUserOnWhitelist;

    modifier onlyOwner(){
        require(msg.sender == owner, "You do not have permissions to execute this function");
        _;
    }

    modifier whitelistHolder(){
        require(_isUserOnWhitelist[msg.sender], "You do not have permissions to execute this function");
        _;
    }
    
    constructor() ERC1155(_uri){
        owner = msg.sender;
    } 

    //mint token
    function mint(uint256 tokenId, uint256 amount) public onlyOwner() returns(bool) {
        _mint(msg.sender, tokenId, amount, "");
        return true;
    }

    function giveaway(uint256 tokenId, address holder) public onlyOwner() returns(bool) {
        _mint(holder, tokenId, 1, "");
        return true;
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory){
        return(string(abi.encodePacked(_uri,"/", Strings.toString(tokenId),".json")));
    }

    function setURI(string memory tokenURI) public onlyOwner() {
        _uri = tokenURI;
    }

    function addUserToWhitelist(address holder) public onlyOwner() returns(bool){
        require(!_isUserOnWhitelist[holder], "User is already whitelisted");
        require(usersWhitelisted < 150, "Maximum number of users whitelisted");

        _isUserOnWhitelist[holder] = true;
        usersWhitelisted += 1;

        return _isUserOnWhitelist[holder];
    }

    function mintInWhitelist() public whitelistHolder() payable returns(uint) {
        require(msg.value >= 0.01 ether, "Introduce the correct price"); 

        uint tokenId = 0;
        address payable to = payable(owner);

        if(block.timestamp >= 1647126000 && block.timestamp <= 1647385200){ // Date between 13/03 and 15/03
            tokenId = 1;
        } else if(block.timestamp >= 1648335600 && block.timestamp <= 1648591200){ // Date between 27/03 and 30/03
            tokenId = 2;
        } else if(block.timestamp >= 1648936800 && block.timestamp <= 1649196000){ //Date between 03/04 and 06/04
            tokenId = 3;
        }

        require(tokenId != 0, "Out of date");
        require(balanceOf(msg.sender, tokenId) == 0, "Maximum of tokens minted on presale");
        
        _mint(msg.sender, tokenId, 1, "");       
        
        to.transfer(msg.value); //Send the part to the contract owner
       
        return tokenId;
    }

    function contractURI() public pure returns(string memory){
        return "https://gateway.pinata.cloud/ipfs/QmbrDAU9fyg4GWKr2yeA7kQZEdgYHAmNcDS9E7cXDJ7yAP";
    }

}