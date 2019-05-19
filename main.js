const { BlockChain, Transaction } = require('./class');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const { PrivateKey, PublicKey } = require('./key.json');
const myKey = ec.keyFromPrivate(PrivateKey);
const myWalletAddress = myKey.getPublic('hex');

let testBlockChain = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'address2', 20);
tx1.signTransaction(myKey);
testBlockChain.addTransaction(tx1);

console.log('====================================');
console.log('Starting the miner');
console.log('====================================');
testBlockChain.minePendingTransactions(myWalletAddress);
console.log(
  `Balance of Mart : ${testBlockChain.getBalanceOfAddress(myWalletAddress)}`
);
console.log('Is chain valid?', testBlockChain.isChainValid());

const tx2 = new Transaction(myWalletAddress, 'address1', 10);
tx2.signTransaction(myKey);
testBlockChain.addTransaction(tx2);

console.log('====================================');
console.log('Starting the miner again');
console.log('====================================');
testBlockChain.minePendingTransactions(myWalletAddress);
console.log(
  `Balance of Mart : ${testBlockChain.getBalanceOfAddress(myWalletAddress)}`
);
console.log('Is chain valid?', testBlockChain.isChainValid());

// Uncomment this line if you want to test tampering with the chain
testBlockChain.chain[1].transactions[0].amount = 10;
console.log('Is chain valid?', testBlockChain.isChainValid());
