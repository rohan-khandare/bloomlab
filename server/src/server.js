const express = require("express");
const cors = require("cors");

const BloomFilter = require("./bloomFilter");

const app = express();

const PORT = process.env.PORT || 5000;


/* ========================================
   MIDDLEWARE
======================================== */

app.use(cors());

app.use(express.json());


/* ========================================
   MAIN BLOOM FILTER
======================================== */

const bloom = new BloomFilter(32, 3);


/* ========================================
   ROOT
======================================== */

app.get("/", (req, res) => {
  res.json({
    message: "BloomLab API is running"
  });
});


/* ========================================
   GET BLOOM FILTER STATE
======================================== */

app.get(
  "/api/bloom/state",
  (req, res) => {

    res.json({
      size: bloom.size,

      hashCount:
        bloom.hashCount,

      bits:
        bloom.bits
    });

  }
);


/* ========================================
   GET BLOOM FILTER STATS
======================================== */

app.get(
  "/api/bloom/stats",
  (req, res) => {

    const size =
      bloom.size;

    const hashCount =
      bloom.hashCount;

    const insertedItems =
      bloom.itemCount;

    const insertedBits =
      bloom.bits.filter(
        bit => bit === 1
      ).length;

    const fillRatio =
      insertedBits / size;

    const falsePositiveRate =
      insertedItems === 0
        ? 0
        : Math.pow(
            1 -
              Math.exp(
                (-hashCount *
                  insertedItems) /
                  size
              ),
            hashCount
          );

    res.json({

      size,

      hashCount,

      insertedItems,

      insertedBits,

      fillRatio,

      falsePositiveRate

    });

  }
);


/* ========================================
   ADD ITEM
======================================== */

app.post(
  "/api/bloom/add",
  (req, res) => {

    const { value } =
      req.body;

    if (
      !value ||
      !value.trim()
    ) {

      return res
        .status(400)
        .json({
          message:
            "Value is required"
        });

    }

    const cleanValue =
      value.trim();

    const positions =
      bloom.add(
        cleanValue
      );

    res.json({

      value:
        cleanValue,

      positions,

      bits:
        bloom.bits

    });

  }
);


/* ========================================
   CHECK ITEM
======================================== */

app.post(
  "/api/bloom/check",
  (req, res) => {

    const { value } =
      req.body;

    if (
      !value ||
      !value.trim()
    ) {

      return res
        .status(400)
        .json({
          message:
            "Value is required"
        });

    }

    const cleanValue =
      value.trim();

    const positions =
      bloom.getPositions(
        cleanValue
      );

    const exists =
      bloom.contains(
        cleanValue
      );

    res.json({

      value:
        cleanValue,

      exists,

      positions

    });

  }
);


/* ========================================
   RESET FILTER
======================================== */

app.post(
  "/api/bloom/reset",
  (req, res) => {

    bloom.bits.fill(0);

    bloom.itemCount = 0;

    res.json({

      message:
        "Bloom Filter reset",

      bits:
        bloom.bits

    });

  }
);


/* ========================================
   FALSE POSITIVE DEMONSTRATION
======================================== */

app.get(
  "/api/bloom/false-positive-demo",
  (req, res) => {

    const demoBloom =
      new BloomFilter(8, 3);


    const insertedItems = [
      "apple",
      "banana",
      "orange"
    ];


    for (
      const item of insertedItems
    ) {

      demoBloom.add(item);

    }


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


    const falsePositive =
      candidates.find(
        item =>
          !insertedItems.includes(
            item
          ) &&
          demoBloom.contains(
            item
          )
      );


    if (!falsePositive) {

      return res.json({
        found: false
      });

    }


    res.json({

      found: true,

      insertedItems,

      testedItem:
        falsePositive,

      positions:
        demoBloom.getPositions(
          falsePositive
        ),

      bits:
        demoBloom.bits

    });

  }
);


/* ========================================
   START SERVER
======================================== */

app.listen(
  PORT, "0.0.0.0",
  () => {

    console.log(
      `BloomLab API running at http://localhost:${PORT}`
    );

  }
);