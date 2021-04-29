const Fit = artifacts.require("FitChain");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Fit, 100, 2);

};