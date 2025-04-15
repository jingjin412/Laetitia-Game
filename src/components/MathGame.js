import React, { useState, useEffect } from "react";
import "./MathGame.css";

const operations = ["+", "-", "*"];

const getRandomNumber = (max) => Math.floor(Math.random() * max);
const getRandomOperation = () => operations[Math.floor(Math.random() * operations.length)];

const generateQuestion = () => {
  let a = getRandomNumber(100);
  let b = getRandomNumber(100);
  let op = getRandomOperation();

  // 確保 a >= b，避免負數
  if (op === "-" && a < b) {
    [a, b] = [b, a];
  }

  // 限制 b 以減少過大的乘法結果
  if (op === "*") {
    b = getRandomNumber(10);
  }

  let answer;
  switch (op) {
    case "+":
      answer = a + b;
      break;
    case "-":
      answer = a - b;
      break;
    case "*":
      answer = a * b;
      break;
    default:
      answer = 0;
  }

  return { a, b, op, answer };
};

const MathGame = ({ setGame }) => {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
    }
    setUserAnswer("");
    if (round < 4) {
      setQuestion(generateQuestion());
      setRound(round + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    setQuestion(generateQuestion());
    setUserAnswer("");
  };

  return (
    <div className="math-game">
      <h1>🧮 數學小遊戲</h1>
      {!gameOver ? (
        <>
          <p className="question">
            {question.a} {question.op} {question.b} = ?
          </p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="answer-input"
            autoFocus
          />
          <button onClick={checkAnswer} className="submit-btn">確定</button>
          <p className="score">目前得分：{score}</p>
          <p className="round">第 {round + 1} / 5 題</p>
        </>
      ) : (
        <>
          <h2>🎉 遊戲結束！</h2>
          <p>你的最終得分是 <strong>{score} / 5</strong></p>
          <button onClick={restartGame} className="restart-btn">再玩一次</button>
        </>
      )}
      <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
    </div>
  );
};

export default MathGame;
