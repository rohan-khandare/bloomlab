const BloomFilter = require("./bloomFilter");

function testFilter(size, hashCount, items, tests) {
  const bloom = new BloomFilter(size, hashCount);

  console.log("\n==============================");
  console.log("Bloom Filter Experiment");
  console.log("==============================");

  console.log(`Size: ${size} bits`);
  console.log(`Hash functions: ${hashCount}`);

  console.log("\nAdding:");

  for (const item of items) {
    bloom.add(item);
    console.log(`+ ${item}`);
  }

  console.log("\nBit array:");

  console.log(bloom.bits.join(" "));

  console.log("\nChecking:");

  for (const item of tests) {
    console.log(
      `${item.padEnd(10)} → ${bloom.contains(item)}`
    );
  }
}

const insertedItems = [
  "apple",
  "banana",
  "computer",
  "hello"
];

const testItems = [
  "apple",
  "banana",
  "computer",
  "hello",
  "orange",
  "mango",
  "pizza"
];

testFilter(
  16,
  3,
  insertedItems,
  testItems
);