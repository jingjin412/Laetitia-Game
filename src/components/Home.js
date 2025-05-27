import React from "react";
import "./Home.css";

const Home = ({ setGame }) => {
  return (
    <div className="home">
      <div className="game-buttons">
        <button onClick={() => setGame("tic-tac-toe")}>⭕ 圈圈叉叉</button>
        <button onClick={() => setGame("guess-number")}>🔢 終極密碼</button>
        <button onClick={() => setGame("whack-a-mole")}>🐹 打地鼠</button>
        <button onClick={() => setGame("typing-game")}>💖 打字遊戲</button>
        <button onClick={() => setGame("math-game")}>🧮 算數遊戲</button>
        <button onClick={() => setGame("five-game")}>🧮 五子棋</button>
      </div>
    </div>
  );
};

export default Home;
