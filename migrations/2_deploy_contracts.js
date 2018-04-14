var DToken = artifacts.require("./DToken.sol");

module.exports = function(deployer) {
  deployer.deploy(DToken);
};
