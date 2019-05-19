const Block = require('./Block.js');
const Transaction = require('./Transaction.js');

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    // For make sure the tracsaction will update only one per time
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  // Create origin of blockchain
  createGenesisBlock() {
    return new Block(Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * @param {Transaction} transaction
   * - Store newest transaction into list,array. Then waiting for hash calculate
   * - The transaction will store address between user together
   * - And will working on them when the hash is solved.
   */
  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  /**
   *
   * @param {Block Address} miningRewardAddress
   * - Send the transaction it pending in the list. Return the new block then hash solving.
   * - After solving the block. Then push it into chain.
   * - After that. Send reward to the address who solve the hash and send reward to miner address.
   */
  minePendingTransactions(miningRewardAddress) {
    // Create block
    let block = new Block(Date.now(), this.pendingTransactions);
    // Solve hash by difficult that set in blockchain system
    block.mineBlock(this.difficulty);

    console.log(`Block successfully mined!`);
    // After solve the hash. Then push it into chain.
    this.chain.push(block);

    // Then create new transaction and give reward to hash address.
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  /**
   * This method will iterate the chain for check hash data in each block
   */
  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = BlockChain;
