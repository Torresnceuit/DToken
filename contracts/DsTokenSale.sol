pragma solidity ^0.4.21;

import "./DsToken.sol";


/**
 * The DsTokenSale contract does this and that...
 */
contract DsTokenSale {

	address admin;
	DsToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;
	function DsTokenSale (DsToken _tokenContract, uint256 _tokenPrice) public {
		// Assign admin
		admin = msg.sender;
		// Token Contract 
		tokenContract = _tokenContract;
		// Token Price
		tokenPrice = _tokenPrice;
	}

	// multiply 
	function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }	

	function buyTokens (uint256 _numberOfTokens) public payable {
		// Require value equal tokens 
		require(msg.value == multiply(_numberOfTokens, tokenPrice));
		// Require  contract has enough tokens 
		require (tokenContract.balanceOf(this) > _numberOfTokens);
		// Require transfer is successful

		require (tokenContract.transfer(msg.sender, _numberOfTokens));
		
		// Keep track of tokenSold
		tokensSold+= _numberOfTokens;
		// Trigger sell event 
		emit Sell(msg.sender, _numberOfTokens);
	}

	// Ending Token Sale 
	function  endSale () public {
		// Reqire admin 
		require (msg.sender == admin);
		// Transfer remaining DsToken to admin
		require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
		// Destroy contract 
		selfdestruct(admin);

		
	}
	

	event Sell(address indexed _buyer,
				uint256 _amount);
	
	
}
