const { Block, BlockChain } = require('../class');

let testBlockChain = new BlockChain();

testBlockChain.addBlock(new Block(1, Date.now(), { amount: 4 }));
testBlockChain.addBlock(new Block(2, Date.now(), { amount: 8 }));

console.log('====================================');
console.log(JSON.stringify(testBlockChain, null, 4));
console.log('====================================');
console.log('Is blockchain valid? :', testBlockChain.isChainValid());
console.log('====================================');
// Test overwrite new hash data
testBlockChain.chain[1].data = { amount: 1000 };
testBlockChain.chain[1].hash = testCoin.chain[1].calculateHash();
console.log(
  'Is blockchain valid after edited? :',
  testBlockChain.isChainValid()
);
console.log('====================================');
