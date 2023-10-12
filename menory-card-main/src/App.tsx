import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={() => {}}>New Game</button>

        <div className="card-grid">
          <div className="card">
            <div className="flipped">
              <img className="front" alt="card front" src="img/helmet-1.png" />
              <img className="back" src="img/cover.png" alt="cover" />
            </div>
          </div>
          <div className="card">
            <div>
              <img className="front" alt="card front" src="img/potion-1.png" />
              <img className="back" src="img/cover.png" alt="cover" />
            </div>
          </div>
          <div className="card">
            <div className="flipped">
              <img className="front" alt="card front" src="img/potion-1.png" />
              <img className="back" src="img/cover.png" alt="cover" />
            </div>
          </div>
        </div>

        <p>Turns: (TURN)</p>
      </div>
    </>
  );
}

export default App;
