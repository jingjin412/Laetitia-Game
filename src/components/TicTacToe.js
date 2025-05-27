import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = ({ setGame }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "O" : "X";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>⭕❌ 井字棋</h1>
      <div className="board">
        {board.map((value, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <div className="status">
        {winner ? `勝者：${winner}` : `輪到：${isXNext ? "O" : "X"}`}
      </div>
      <button className="reset-btn" onClick={resetGame}>重新開始</button>
      <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
