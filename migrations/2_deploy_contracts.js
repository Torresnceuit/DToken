var DsToken = artifacts.require("./DsToken.sol");

module.exports = function(deployer) {
  deployer.deploy(DsToken, 1000000);
};
