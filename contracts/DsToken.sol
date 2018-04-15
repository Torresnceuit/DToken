pragma solidity ^0.4.21;

/**
 * The DToken contract does this and that...
 */
 contract DsToken {
	/*
	 * Set the total number of tokens
	 * Get the total number of tokens
	 */
	 string public name = "Ds Token";
	 string public symbol = "DS";
	 string public standard = "Ds Token v1.0.0";
	 uint256 public totalSupply;
	 //Map the address to the value of balance
	 mapping (address => uint256) public balanceOf;

	 function DsToken (uint256 _initialSupply) public {
	 	totalSupply = _initialSupply;
	 	balanceOf[msg.sender] = _initialSupply;
	 }	

	 event Transfer(
	 	address indexed _from,
	 	address indexed _to,
	 	uint256 _value 
	 );



	 //Tranfer function
	 function transfer (address _to, uint256 _value) public returns(bool success){
	 	//Exception if account doesn't have enough 
	 	require(balanceOf[msg.sender] >= _value);
	 	//Tranfer balance
	 	balanceOf[msg.sender] -= _value;
	 	balanceOf[_to] += _value;
	 	//Trigger tranfer event
	 	Transfer(msg.sender, _to, _value);
	 	//Return a boolean
	 	return true;

	 }

	}
