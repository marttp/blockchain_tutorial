const Block = require('./Block.js');

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  // Create origin of blockchain
  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   *
   * @param {Block} newBlock
   * This method is used to add new block into chain
   * - before add into chain. newBlock will get hash data from latest block
   * - then, generate own hash data. And push to the chain.
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
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
