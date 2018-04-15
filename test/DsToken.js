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

	it("tranfer tokens of ownership",function(){
		return DsToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.tranfer.call(accounts[1],999999999999)
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >=0, "error must have revert")
			return tokenInstance.tranfer.call(accounts[1],250000,{from: accounts[0]})
		}).then(function(success){
			assert.equal(success, true, "it return true")
			return tokenInstance.tranfer(accounts[1],250000,{from: accounts[0]})
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1])
		}).then(function(balance){
			assert.equal(balance.toNumber(), 250000, "adds the amount to the receiving account")
			return tokenInstance.balanceOf(accounts[0])
		}).then(function(balance){
			assert.equal(balance.toNumber(), 750000, "deducts the amount from sending account")
		})
	})

})