import React, { useState } from "react";
import "./five.css";

const BOARD_SIZE = 15;

const Gomoku = ({ setGame }) => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [isBlackNext, setIsBlackNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map(row => row.slice());
    newBoard[row][col] = isBlackNext ? "⚫" : "⚪";
    setBoard(newBoard);
    if (checkWinner(newBoard, row, col)) {
      setWinner(isBlackNext ? "⚫" : "⚪");
    } else {
      setIsBlackNext(!isBlackNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setIsBlackNext(true);
    setWinner(null);
  };

  return (
    <div className="five">
      <div className="game">
        <h1>⚫⚪ 五子棋</h1>
        <div className="board gomoku">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <button
                  key={colIndex}
                  className="cell"
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="status">
          {winner ? `勝者：${winner}` : `輪到：${isBlackNext ? "⚫" : "⚪"}`}
        </div>
        <button className="reset-btn" onClick={resetGame}>重新開始</button>
        <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
      </div>
    </div>
  );
};

const checkWinner = (board, row, col) => {
  const target = board[row][col];
  if (!target) return false;

  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let [dx, dy] of directions) {
    let count = 1;

    for (let d = 1; d < 5; d++) {
      const r = row + dx * d;
      const c = col + dy * d;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === target) {
        count++;
      } else break;
    }

    for (let d = 1; d < 5; d++) {
      const r = row - dx * d;
      const c = col - dy * d;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === target) {
        count++;
      } else break;
    }

    if (count >= 5) return true;
  }
  return false;
};

export default Gomoku;