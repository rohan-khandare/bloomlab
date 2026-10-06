class BloomFilter {
  constructor(size = 32, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;

    this.bits = new Array(size).fill(0);

    // Track number of insertion operations
    this.itemCount = 0;
  }

  hash(value, seed) {
    let hash = seed;

    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }

    return hash % this.size;
  }

  getPositions(value) {
    const positions = [];

    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hash(
        value,
        17 + i * 101
      );

      positions.push(position);
    }

    return positions;
  }

  add(value) {
    const positions = this.getPositions(value);

    for (const position of positions) {
      this.bits[position] = 1;
    }

    // Count this insertion operation
    this.itemCount++;

    return positions;
  }

  contains(value) {
    const positions = this.getPositions(value);

    return positions.every(
      position => this.bits[position] === 1
    );
  }
}

module.exports = BloomFilter;