var DsTokenSale = artifacts.require("./DsTokenSale.sol")
var DsToken = artifacts.require("./DsToken.sol")

contract("DsTokenSale",function (accounts) {
	/* body... */
	var tokenSaleInstance;
	var tokenInstance;
	var tokenPrice = 1000000000000000;
	var buyer = accounts[1];
	var admin = accounts[0];
	var tokenAvailable = 750000;
	it("initialize the contract with correct value", function(){
		return DsTokenSale.deployed().then(function(instance){
			tokenSaleInstance = instance;
			return tokenSaleInstance.address;
		}).then(function(address){
			assert.notEqual(address, 0x0, "has contract address")
			return tokenSaleInstance.tokenContract()
		}).then(function(address){
			assert.notEqual(address, 0x0, "has token contract")
			return tokenSaleInstance.tokenPrice()
		}).then(function(price){
			assert.equal(price, tokenPrice, "has correct price")
		})
	})

	it('facilitates token buying', function(){
		return DsToken.deployed().then(function(instance){
			tokenInstance = instance;
			DsTokenSale.deployed()
		}).then(function(instance){
			tokenSaleInstance = instance;
			return tokenInstance.transfer(tokenSaleInstance.address, tokenAvailable, {from: admin})
		}).then(function(receipt){
			var numOfTokens = 10;
			var value = tokenPrice*numOfTokens;
			return tokenSaleInstance.buyTokens(numOfTokens, {from: buyer, value})
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
			assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
			assert.equal(receipt.logs[0].args._amount, numOfTokens, 'logs the number of tokens purchased');
			return tokenSaleInstance.tokensSold()
		}).then(function(amount){
			assert.equal(amount.toNumber(), numOfTokens, 'increments number of token sold')
			// Try to buy tokens different from the ether value
			return tokenInstance.balanceOf(buyer);
		}).then(function(balance){
			assert.equal(balance.toNumber(), numOfTokens, 'balance of buyer must equal to 10')
			return tokenInstance.balanceOf(tokenSaleInstance.address)
		}).then(function(balance){
			assert.equal(balance.toNumber(), tokenAvailable - numOfTokens)
			return tokenSaleInstance.buyTokens(numOfTokens, { from: buyer, value: 1 });
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
			return tokenSaleInstance.buyTokens(800000, { from: buyer, value: numOfTokens * tokenPrice })
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
		});
	})

	it('ends token sale', function() {
		return DsToken.deployed().then(function(instance) {
      // Grab token instance first
      tokenInstance = instance;
      return DsTokenSale.deployed();
  	}).then(function(instance) {
	      // Then grab token sale instance
	      tokenSaleInstance = instance;
	      // Try to end sale from account other than the admin
	      return tokenSaleInstance.endSale({ from: buyer });
	  }).then(assert.fail).catch(function(error) {
	  	assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
	      // End sale as admin
	      return tokenSaleInstance.endSale({ from: admin });
	  }).then(function(receipt) {
	  	return tokenInstance.balanceOf(admin);
	  }).then(function(balance) {
	  	assert.equal(balance.toNumber(), 999990, 'returns all unsold ds tokens to admin');
	      // Check that token price was reset when selfDestruct was called
	      return tokenSaleInstance.tokenPrice();
	  }).then(function(price) {
	  	assert.equal(price.toNumber(), 0, 'token price was reset');
	  });
	})

})