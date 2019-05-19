const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timeStamp, transactions, previousHash = '') {
    this.timeStamp = timeStamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timeStamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  /**
   * @param {number: integer} difficulty
   * - Implement Proof-of-Work concept to hash block
   */
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}

module.exports = Block;
