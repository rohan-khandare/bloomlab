
import { useEffect, useState } from "react";
import "./App.css";
import BitArray from "./components/BitArray";

const API_URL = "http://localhost:5000/api/bloom";

function App() {
  const [bits, setBits] = useState([]);

  const [highlightedPositions, setHighlightedPositions] =
    useState([]);

  const [input, setInput] = useState("");

  const [checkResult, setCheckResult] = useState(null);

  const [highlightMode, setHighlightMode] =
    useState("add");

  const [stats, setStats] = useState(null);

  const [falsePositiveDemo, setFalsePositiveDemo] =
    useState(null);

  const [demoLoading, setDemoLoading] =
    useState(false);


  /* ========================================
     LOAD INITIAL DATA
  ======================================== */

  useEffect(() => {
    loadBloomState();
    loadStats();
  }, []);


  /* ========================================
     LOAD BLOOM FILTER STATE
  ======================================== */

  async function loadBloomState() {
    try {
      const response = await fetch(
        `${API_URL}/state`
      );

      const data = await response.json();

      setBits(data.bits);

    } catch (error) {
      console.error(
        "Failed to load Bloom Filter:",
        error
      );
    }
  }


  /* ========================================
     LOAD BLOOM FILTER STATS
  ======================================== */

  async function loadStats() {
    try {
      const response = await fetch(
        `${API_URL}/stats`
      );

      const data = await response.json();

      setStats(data);

    } catch (error) {
      console.error(
        "Failed to load Bloom Filter stats:",
        error
      );
    }
  }


  /* ========================================
     ADD ITEM
  ======================================== */

  async function addValue() {
    if (!input.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            value: input
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setBits(data.bits);

      setHighlightedPositions(
        data.positions
      );

      setHighlightMode("add");

      setCheckResult(null);

      setInput("");

      await loadStats();

    } catch (error) {
      console.error(
        "Failed to add value:",
        error
      );
    }
  }


  /* ========================================
     CHECK ITEM
  ======================================== */

  async function checkValue() {
    if (!input.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/check`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            value: input
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setHighlightedPositions(
        data.positions
      );

      setHighlightMode("check");

      setCheckResult(data);

    } catch (error) {
      console.error(
        "Failed to check value:",
        error
      );
    }
  }


  /* ========================================
     RESET FILTER
  ======================================== */

  async function resetFilter() {
    try {
      const response = await fetch(
        `${API_URL}/reset`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setBits(data.bits);

      setHighlightedPositions([]);

      setCheckResult(null);

      setHighlightMode("add");

      setInput("");

      await loadStats();

    } catch (error) {
      console.error(
        "Failed to reset Bloom Filter:",
        error
      );
    }
  }


  /* ========================================
     FALSE POSITIVE DEMO
  ======================================== */

  async function runFalsePositiveDemo() {
    setDemoLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/false-positive-demo`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setFalsePositiveDemo(data);

    } catch (error) {
      console.error(
        "Failed to run false positive demo:",
        error
      );

    } finally {
      setDemoLoading(false);
    }
  }


  return (
    <div className="app">


      {/* ========================================
          NAVBAR
      ======================================== */}

      <nav className="navbar">

        <div className="logo">
          BLOOM<span>LAB</span>
        </div>

        <a
          href="https://github.com/rohan-khandare/bloomlab"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>

      </nav>


      <main>


        {/* ========================================
            HERO
        ======================================== */}

        <section className="hero">

          <div className="eyebrow">
            INTERACTIVE DATA STRUCTURES
          </div>

          <h1>
            Understand Bloom Filters
            <span>
              {" "}by seeing them work.
            </span>
          </h1>

          <p>
            A visual playground for understanding
            probabilistic data structures,
            hashing and memory-efficient lookups.
          </p>

          <a
            href="#lab"
            className="startButton"
          >
            Start Experiment ↓
          </a>

        </section>


        {/* ========================================
            INTRO
        ======================================== */}

        <section className="intro">

          <div className="sectionNumber">
            01 — THE IDEA
          </div>

          <h2>
            What if we could ask
            <br />
            "Does it exist?"
            <br />
            without storing everything?
          </h2>

        </section>


        {/* ========================================
            MAIN LAB
        ======================================== */}

        <section
          className="labPlaceholder"
          id="lab"
        >

          <div className="sectionNumber">
            02 — THE LAB
          </div>

          <h2>
            Bloom Filter Lab
          </h2>

          <p>
            Every Bloom Filter begins with a simple
            array of bits.
          </p>


          {/* BIT ARRAY */}

          <BitArray
            bits={bits}
            highlightedPositions={
              highlightedPositions
            }
            highlightMode={highlightMode}
          />


          {/* EXPERIMENT CONTROLS */}

          <div className="addControl">

            <div className="controlLabel">
              EXPERIMENT
            </div>

            <div className="inputRow">

              <input
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(
                    event.target.value
                  );

                  setCheckResult(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addValue();
                  }
                }}
                placeholder="e.g. apple"
              />

              <button
                className="addButton"
                onClick={addValue}
              >
                ADD
              </button>

              <button
                className="checkButton"
                onClick={checkValue}
              >
                CHECK
              </button>

            </div>


            <button
              className="resetButton"
              onClick={resetFilter}
            >
              RESET FILTER
            </button>

          </div>


          {/* CHECK RESULT */}

          {checkResult && (

            <div
              className={`checkResult ${
                checkResult.exists
                  ? "probably"
                  : "definitelyNot"
              }`}
            >

              <div className="resultLabel">
                MEMBERSHIP CHECK
              </div>

              <div className="resultTitle">

                {checkResult.exists
                  ? "PROBABLY EXISTS"
                  : "DEFINITELY DOES NOT EXIST"}

              </div>

              <div className="resultPositions">

                Hash positions:

                <span>
                  {checkResult.positions.join(
                    " · "
                  )}
                </span>

              </div>

              <p>

                {checkResult.exists
                  ? "All required bits are 1. The Bloom Filter says this item probably exists, but a false positive is possible."
                  : "At least one required bit is 0. Therefore, this item definitely does not exist in the Bloom Filter."}

              </p>

            </div>

          )}


            {/* ========================================
                FILTER STATISTICS
            ======================================== */}

            {stats && (

              <div className="filterStats">

                <div className="statsHeader">

                  <div>

                    <div className="controlLabel">
                      FILTER PARAMETERS
                    </div>

                    <h3>
                      Under the hood
                    </h3>

                  </div>

                </div>


                <div className="statsGrid">


                  {/* BIT ARRAY SIZE */}

                  <div className="statCard">

                    <span className="statLabel">
                      BIT ARRAY SIZE
                    </span>

                    <strong>
                      {stats.size}
                    </strong>

                    <small>
                      bits
                    </small>

                  </div>


                  {/* HASH FUNCTIONS */}

                  <div className="statCard">

                    <span className="statLabel">
                      HASH FUNCTIONS
                    </span>

                    <strong>
                      {stats.hashCount}
                    </strong>

                    <small>
                      functions
                    </small>

                  </div>


                  {/* ITEMS */}

                  <div className="statCard">

                    <span className="statLabel">
                      ITEMS INSERTED
                    </span>

                    <strong>
                      {stats.insertedItems}
                    </strong>

                    <small>
                      operations
                    </small>

                  </div>


                  {/* BITS SET */}

                  <div className="statCard">

                    <span className="statLabel">
                      BITS SET
                    </span>

                    <strong>

                      {stats.insertedBits}

                      <span className="statTotal">
                        /{stats.size}
                      </span>

                    </strong>

                    <small>

                      {(
                        stats.fillRatio * 100
                      ).toFixed(1)}

                      % filled

                    </small>

                  </div>

                </div>


                {/* FALSE POSITIVE PROBABILITY */}

                <div className="probabilityCard">

                  <div>

                    <span className="statLabel">
                      ESTIMATED FALSE POSITIVE
                    </span>

                    <strong>

                      {(
                        stats.falsePositiveRate * 100
                      ).toFixed(2)}

                      %

                    </strong>

                  </div>

                  <p>
                    Approximation based on the current
                    bit-array size, number of hash
                    functions and inserted items.
                  </p>

                </div>

                <div className="mathExplanation">
    <div className="mathHeader">
      <div>
        <span className="statLabel">THE MATH BEHIND THE PROBABILITY</span>
        <h3>How is this calculated?</h3>
      </div>
    </div>

    <div className="formulaBlock">
      <span className="formulaLabel">FALSE POSITIVE PROBABILITY</span>

      <div className="mainFormula">
        P ≈ (1 − e<sup>−kn/m</sup>)<sup>k</sup>
      </div>
    </div>

    <div className="mathTerms">
      <div className="mathTerm">
        <strong>m</strong>
        <div>
          <span>BIT ARRAY SIZE</span>
          <p>
            Number of available bits in the Bloom Filter.
          </p>
        </div>
      </div>

      <div className="mathTerm">
        <strong>n</strong>
        <div>
          <span>ITEMS INSERTED</span>
          <p>
            Number of items inserted into the filter.
          </p>
        </div>
      </div>

      <div className="mathTerm">
        <strong>k</strong>
        <div>
          <span>HASH FUNCTIONS</span>
          <p>
            Number of hash functions used for each item.
          </p>
        </div>
      </div>

      <div className="mathTerm">
        <strong>P</strong>
        <div>
          <span>FALSE POSITIVE PROBABILITY</span>
          <p>
            Probability that an item not inserted is
            incorrectly reported as probably present.
          </p>
        </div>
      </div>

      <div className="mathTerm">
        <strong>e</strong>
        <div>
          <span>EULER'S NUMBER</span>
          <p>
            A mathematical constant approximately equal to 2.718.
          </p>
        </div>
      </div>
    </div>

    <div className="calculationBlock">
      <span className="formulaLabel">FOR YOUR CURRENT FILTER</span>

      <div className="calculationValues">
        <div>
          <span>m</span>
          <strong>{stats.size}</strong>
        </div>

        <div>
          <span>n</span>
          <strong>{stats.insertedItems}</strong>
        </div>

        <div>
          <span>k</span>
          <strong>{stats.hashCount}</strong>
        </div>
      </div>

      <div className="calculationSteps">
        <p>
          P ≈ (1 − e<sup>−kn/m</sup>)<sup>k</sup>
        </p>

        <p>
          P ≈ (1 − e<sup>
            −({stats.hashCount} × {stats.insertedItems})/{stats.size}
          </sup>)<sup>{stats.hashCount}</sup>
        </p>

        <p>
          P ≈ {(stats.falsePositiveRate * 100).toFixed(2)}%
        </p>
      </div>
    </div>

    <div className="simpleExplanation">
      <span className="formulaLabel">IN SIMPLE TERMS</span>

      <p>
        Every inserted item sets several bits to <strong>1</strong>.
        As more items are added, more bits become occupied.
        Eventually, a new item may have all of its hash positions
        already set to <strong>1</strong> by other items.
      </p>

      <p>
        The Bloom Filter then says
        <strong> "probably present"</strong>,
        even though the item was never inserted.
        That is a <strong>false positive</strong>.
      </p>
    </div>
  </div>

            </div>

          )}

        </section>


        {/* ========================================
            FALSE POSITIVE SECTION
        ======================================== */}

        <section className="falsePositiveSection">

          <div className="sectionNumber">
            03 — FALSE POSITIVES
          </div>

          <h2>
            Sometimes,
            <br />
            "probably" is wrong.
          </h2>

          <p className="falsePositiveIntro">
            A Bloom Filter never stores the original
            values. When different items set the same
            bits, an item that was never added can
            appear to exist.
          </p>


          <div className="demoCard">

            <div className="demoHeader">

              <div>

                <div className="demoEyebrow">
                  CONTROLLED EXPERIMENT
                </div>

                <h3>
                  Can we fool the filter?
                </h3>

              </div>

              <button
                className="demoButton"
                onClick={
                  runFalsePositiveDemo
                }
                disabled={demoLoading}
              >

                {demoLoading
                  ? "RUNNING..."
                  : "RUN EXPERIMENT →"}

              </button>

            </div>


            {falsePositiveDemo?.found && (

              <div className="demoResult">


                {/* INSERTED ITEMS */}

                <div className="demoColumn">

                  <div className="demoLabel">
                    INSERTED ITEMS
                  </div>

                  <div className="itemList">

                    {falsePositiveDemo.insertedItems.map(
                      (item) => (

                        <span
                          key={item}
                          className="insertedItem"
                        >
                          {item}
                        </span>

                      )
                    )}

                  </div>

                </div>


                {/* ARROW */}

                <div className="demoArrow">
                  →
                </div>


                {/* NEVER INSERTED */}

                <div className="demoColumn">

                  <div className="demoLabel">
                    NEVER INSERTED
                  </div>

                  <div className="falseItem">
                    {falsePositiveDemo.testedItem}
                  </div>

                </div>


                {/* CONCLUSION */}

                <div className="demoConclusion">

                  <div className="falseIcon">
                    ⚠
                  </div>

                  <div>

                    <div className="falseTitle">
                      FALSE POSITIVE
                    </div>

                    <p>
                      The item was never inserted,
                      but all of its hash positions
                      are already set to 1.
                    </p>

                  </div>

                </div>


                {/* DEMO BIT ARRAY */}

                <div className="demoBitSection">

                  <div className="demoLabel">
                    THE 8-BIT FILTER
                  </div>

                  <div className="demoBitArray">

                    {falsePositiveDemo.bits.map(
                      (bit, index) => {

                        const highlighted =
                          falsePositiveDemo.positions.includes(
                            index
                          );

                        return (
                          <div
                            key={index}
                            className={`
                              demoBit
                              ${
                                bit === 1
                                  ? "demoBitActive"
                                  : ""
                              }
                              ${
                                highlighted
                                  ? "demoBitHighlighted"
                                  : ""
                              }
                            `}
                          >

                            <span>
                              {bit}
                            </span>

                            <small>
                              {index}
                            </small>

                          </div>
                        );

                      }
                    )}

                  </div>


                  <div className="demoBitExplanation">

                    The highlighted bits are the
                    positions generated for{" "}

                    <strong>
                      {falsePositiveDemo.testedItem}
                    </strong>

                    . Every one of them is already
                    set to <strong>1</strong>.

                  </div>

                </div>


                {/* HASH POSITIONS */}

                <div className="demoPositions">

                  <div className="demoLabel">
                    HASH POSITIONS
                  </div>

                  <div className="positionList">

                    {falsePositiveDemo.positions.map(
                      (position) => (

                        <div
                          key={position}
                          className="demoPosition"
                        >

                          <span>
                            {position}
                          </span>

                          <small>
                            BIT = 1
                          </small>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* EXPLANATION */}

          <div className="falseExplanation">

            <div className="explanationNumber">
              01
            </div>

            <div>

              <h3>
                Why did this happen?
              </h3>

              <p>
                Bloom Filters trade perfect accuracy
                for extreme memory efficiency.
                Multiple values can map to the same
                bit positions. If every position for
                a new item is already set, the filter
                cannot tell whether those bits came
                from that item or from other items.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer>

        <div className="logo">
          BLOOM<span>LAB</span>
        </div>

        <p>
          Learn by experimenting.
        </p>

      </footer>

    </div>
  );
}

export default App;