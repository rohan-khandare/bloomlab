const express = require("express");
const cors = require("cors");

const BloomFilter = require("./bloomFilter");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Bloom Filter
const bloom = new BloomFilter(32, 3);


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "BloomLab API is running"
  });
});


// Get current Bloom Filter state
app.get("/api/bloom/state", (req, res) => {
  res.json({
    size: bloom.size,
    hashCount: bloom.hashCount,
    bits: bloom.bits
  });
});


// Add an item
app.post("/api/bloom/add", (req, res) => {

  const { value } = req.body;

  if (!value || !value.trim()) {
    return res.status(400).json({
      message: "Value is required"
    });
  }

  const positions = bloom.add(value.trim());

  res.json({
    value: value.trim(),
    positions,
    bits: bloom.bits
  });
});


// Check an item
app.post("/api/bloom/check", (req, res) => {

  const { value } = req.body;

  if (!value || !value.trim()) {
    return res.status(400).json({
      message: "Value is required"
    });
  }

  const positions = bloom.getPositions(value.trim());

  const exists = bloom.contains(value.trim());

  res.json({
    value: value.trim(),
    exists,
    positions
  });
});


// Reset Bloom Filter
app.post("/api/bloom/reset", (req, res) => {

  bloom.bits.fill(0);

  res.json({
    message: "Bloom Filter reset",
    bits: bloom.bits
  });
});


app.get("/api/bloom/false-positive-demo", (req, res) => {
  // Small filter intentionally used to make collisions easier to see
  const demoBloom = new BloomFilter(8, 3);

  const insertedItems = [
    "apple",
    "banana",
    "orange"
  ];

  // Add known items
  for (const item of insertedItems) {
    demoBloom.add(item);
  }

  // Candidates that were NOT inserted
  const candidates = [
    "mango",
    "computer",
    "hello",
    "pizza",
    "grape",
    "water",
    "flower",
    "dog"
  ];


  // Find a candidate that the Bloom Filter
  // incorrectly reports as present
  const falsePositive = candidates.find(
    item =>
      !insertedItems.includes(item) &&
      demoBloom.contains(item)
  );

  if (!falsePositive) {
    return res.json({
      found: false
    });
  }

  res.json({
    found: true,

    insertedItems,

    testedItem: falsePositive,

    positions:
      demoBloom.getPositions(falsePositive),

    bits: demoBloom.bits
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `BloomLab API running at http://localhost:${PORT}`
  );
});