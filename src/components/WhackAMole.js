import React, { useState, useEffect } from "react";
import "./Game.css";

const WhackAMole = ({ setGame }) => {
  const [moleIndex, setMoleIndex] = useState(Math.floor(Math.random() * 9));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoleIndex(Math.floor(Math.random() * 9));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hitMole = (index) => {
    if (index === moleIndex) {
      setScore(score + 1);
    }
  };

  return (
    <div className="game">
      <h1>🐹 打地鼠</h1>
      <p>分數: {score}</p>
      <div className="board">
        {Array(9).fill(0).map((_, index) => (
          <button
            key={index}
            className={`cell ${index === moleIndex ? "mole" : ""}`}
            onClick={() => hitMole(index)}
          >
            {index === moleIndex ? "🐹" : ""}
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
    </div>
  );
};

export default WhackAMole;
