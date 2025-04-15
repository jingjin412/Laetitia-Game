import React, { useState } from "react";
import "./Game.css";

const GuessNumber = ({ setGame }) => {
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const checkGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage("請輸入有效數字！");
    } else if (num < targetNumber) {
      setMessage("太低了！");
    } else if (num > targetNumber) {
      setMessage("太高了！");
    } else {
      setMessage("🎉 恭喜猜對了！");
    }
  };

  return (
    <div className="game">
      <h1>🔢 猜數字遊戲</h1>
      <p>猜一個 1 到 100 的數字</p>
      <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} />
      <button onClick={checkGuess}>猜！</button>
      <p>{message}</p>
      <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
    </div>
  );
};

export default GuessNumber;
