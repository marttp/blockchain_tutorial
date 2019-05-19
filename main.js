const { BlockChain, Transaction } = require('./class');

let testBlockChain = new BlockChain();
testBlockChain.createTransaction(new Transaction('address1', 'address2', 100));
testBlockChain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('====================================');
console.log('Starting the miner');
console.log('====================================');
testBlockChain.minePendingTransactions('mart-address');
console.log(
  `Balance of Mart : ${testBlockChain.getBalanceOfAddress('mart-address')}`
);

console.log('====================================');
console.log('Starting the miner again');
console.log('====================================');
testBlockChain.minePendingTransactions('mart-address');
console.log(
  `Balance of Mart : ${testBlockChain.getBalanceOfAddress('mart-address')}`
);
