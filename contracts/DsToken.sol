pragma solidity ^0.4.21;

/**
 * The DToken contract does this and that...
 */
contract DsToken {
	/**
	 * set the total number of tokens
	 * get the total number of tokens
	 */
	string public name = "Ds Token";
	string public symbol = "DS";
	string public standard = "Ds Token v1.0.0";
	uint256 public totalSupply;
	// map the address to the value of balance
	mapping (address => uint256) public balanceOf;
	
	function DsToken (uint256 _initialSupply) public {
		totalSupply = _initialSupply;
		balanceOf[msg.sender] = _initialSupply;
	}	

	
}
