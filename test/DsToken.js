var DsToken = artifacts.require("./DsToken.sol")

contract("DsToken",function (accounts) {
	// body...
	var tokenInstance

	it("initialize the contract with correct values",function(){
		return DsToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name()
		}).then(function(name){
			assert.equal(name, "Ds Token", "it has correct name")
			return tokenInstance.symbol()
		}).then(function(symbol){
			assert.equal(symbol, "DS", "it has correct symbol")
			return tokenInstance.standard()
		}).then(function(standard){
			assert.equal(standard, "Ds Token v1.0.0", "it has correct standard")
		})
	})
	it("set the total number of tokens",function(){
		return DsToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, "initial token must be 1000000")
			return tokenInstance.balanceOf(accounts[0])
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 1000000, "it set the totalSupply of admin account to 1000000")
		})
	})
})