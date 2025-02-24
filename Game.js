import React, { useState } from "react";
import "./Game.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>OOXX 小遊戲</h1>
      <div className="board">
        {board.map((value, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <div className="status">
        {winner ? `勝者：${winner}` : `輪到：${isXNext ? "X" : "O"}`}
      </div>
      <button className="reset-btn" onClick={resetGame}>重新開始</button>
    </div>
  );
};

// 判斷勝者
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向
    [0, 4, 8], [2, 4, 6]             // 斜線
  ];
  
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
