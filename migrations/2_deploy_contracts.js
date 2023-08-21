const Paiement = artifacts.require("Paiement");

module.exports = function(deployer) {
  deployer.deploy(Paiement);
};