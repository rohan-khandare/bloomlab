
import { useEffect, useState } from "react";
import "./App.css";
import BitArray from "./components/BitArray";

const API_URL = "http://localhost:5000/api/bloom";

function App() {
  const [bits, setBits] = useState([]);
  const [highlightedPositions, setHighlightedPositions] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadBloomState();
  }, []);

  async function loadBloomState() {
    try {
      const response = await fetch(`${API_URL}/state`);
      const data = await response.json();

      setBits(data.bits);
    } catch (error) {
      console.error(
        "Failed to load Bloom Filter:",
        error
      );
    }
  }

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

      setBits(data.bits);

      setHighlightedPositions(
        data.positions
      );

      setInput("");

    } catch (error) {
      console.error(
        "Failed to add value:",
        error
      );
    }
  }

  return (
    <div className="app">

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

        {/* HERO */}

        <section className="hero">

          <div className="eyebrow">
            INTERACTIVE DATA STRUCTURES
          </div>

          <h1>
            Understand Bloom Filters
            <span> by seeing them work.</span>
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


        {/* INTRODUCTION */}

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


        {/* BLOOM FILTER LAB */}

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
          />


          {/* ADD ITEM */}

          <div className="addControl">

            <div className="controlLabel">
              ADD AN ITEM
            </div>

            <div className="inputRow">

              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addValue();
                  }
                }}
                placeholder="e.g. apple"
              />

              <button onClick={addValue}>
                ADD
              </button>

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
