import React, { useState } from "react";
import Home from "./components/Home";
import TicTacToe from "./components/TicTacToe";
import GuessNumber from "./components/GuessNumber";
import WhackAMole from "./components/WhackAMole";
import TypingGame from "./components/TypingGame";
import MathGame from "./components/MathGame";

function App() {
  const [currentGame, setGame] = useState(null);

  return (
    <div className="App">
      {currentGame === "tic-tac-toe" && <TicTacToe setGame={setGame} />}
      {currentGame === "guess-number" && <GuessNumber setGame={setGame} />}
      {currentGame === "whack-a-mole" && <WhackAMole setGame={setGame} />}
      {currentGame === "typing-game" && <TypingGame setGame={setGame} />}
      {currentGame === "math-game" && <MathGame setGame={setGame} />}
      {currentGame === null && <Home setGame={setGame} />}
    </div>
  );
}

export default App;
