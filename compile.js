const path =require('path');
const fs =require('fs');
const solc =require('solc');

const fitPath=path.resolve(__dirname, 'contracts', 'fit.sol');
const source = fs.readFileSync(fitPath, 'utf-8');

console.log(solc.compile(source,1));

module.exports = solc.compile(source,1).contracts[':fit'];

