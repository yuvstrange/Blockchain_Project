const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let fit;
let accounts;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
   fit = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000'});
});
describe('fitChain Contract test', () => {
  it('deploys a contract',() => {
    assert.ok(FitChain.options.address);
  });
  it('requires a monthly fee to enter', async()=> {
  try {
    await FitChain.methods.pay(100).send({
      from: accounts[1],
      value: 100
    });
    assert(false);
  } catch (err) {
    assert(err);
  }

});
it('only owner can transfer tokens', async() => {
  try{
    await FitChain.methods.transfer(accounts[1],accounts[0],2200,1).send({
      from: accounts[0]
    });
    assert(false);
  } catch(err) {
    assert(err);
  }
});




it('transfers tokens from sender to receiver, updates balances and triggers Transfer event', async() => {
    await FitChain.methods.transfer(accounts[1],accounts[0],2200,1)
      .send({ from: accounts[0], value: web3.utils.toWei('0.5','ether') });
    assert.strictEqual(balance[accounts[1]], 500000000000000000);
  });

});