import "./App.css";

function App() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          BLOOM<span>LAB</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>


      <main>

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
            Our interactive experiment is coming here.
          </p>

        </section>


      </main>


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