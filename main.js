const { Block, BlockChain } = require('./class');

let testBlockChain = new BlockChain();

console.time('Start Blockchain');
console.log('Mining Block...1');
testBlockChain.addBlock(new Block(1, Date.now(), { amount: 4 }));
console.log('Mining Block...2');
testBlockChain.addBlock(new Block(2, Date.now(), { amount: 8 }));
console.timeEnd('Start Blockchain');
