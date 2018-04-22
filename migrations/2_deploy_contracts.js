var DsToken = artifacts.require("./DsToken.sol");
var DsTokenSale = artifacts.require("./DsTokenSale.sol");

module.exports = function(deployer) {
	deployer.deploy(DsToken, 1000000).then(function(){
		return deployer.deploy(DsTokenSale, DsToken.address, 1000000000000000);
	});

};
