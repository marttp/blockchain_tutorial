const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timeStamp, data, previousHash = '') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timeStamp +
        JSON.stringify(this.data) +
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
