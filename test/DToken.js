var DToken = artifacts.require("./DToken.sol")

contract("DToken",function (accounts) {
	// body...
	it("set the total number of tokens",function(){
		return DToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 100000, "initial token must be 1000000")
		})
	})
})