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
	 // Map the address to the value of balance
	 mapping (address => uint256) public balanceOf;
	 // Map the owner address to the map of spender and balance
	 mapping (address => mapping (address => uint256)) public allowance;
	 

	 function DsToken (uint256 _initialSupply) public {
	 	totalSupply = _initialSupply;
	 	balanceOf[msg.sender] = _initialSupply;
	 }	

	 event Transfer(
	 	address indexed _from,
	 	address indexed _to,
	 	uint256 _value );

	 event Approval(
	 	address indexed _owner,
	 	address indexed _spender,
	 	uint256 _value);
	 

	 // Tranfer function
	 function transfer (address _to, uint256 _value) public returns(bool success){
	 	// Exception if account doesn't have enough 
	 	require(balanceOf[msg.sender] >= _value);
	 	// Tranfer balance
	 	balanceOf[msg.sender] -= _value;
	 	balanceOf[_to] += _value;
	 	// Trigger tranfer event
	 	emit Transfer(msg.sender, _to, _value);
	 	// Return a boolean
	 	return true;

	 }

	 // Approve function 
	 function approve (address _spender, uint256 _value) public returns(bool success) {
	 	// Set Allowance
	 	allowance[msg.sender][_spender] = _value;
	 	// Trigger Approval Event
	 	emit Approval(msg.sender, _spender, _value);
	 	return true;
	 }

	 // Tranfer from 
	 function transferFrom (address _from, address _to, uint256 _value) public returns(bool success) {
	 	// _from account has enough tokens
	 	require (balanceOf[_from] >= _value);
	 	// Make sure allowance is enough
	 	require(allowance[_from][msg.sender] >= _value);
	 	// Change the balance
	 	balanceOf[_from] -= _value;
	 	balanceOf[_to] += _value;
	 	// Update allowance
	 	allowance[_from][msg.sender] -= _value;
	 	// Trigger Transfer event 
		emit Transfer(_from, _to, _value);	 	
	 	 return true;
	 }
	 
	 

	}
