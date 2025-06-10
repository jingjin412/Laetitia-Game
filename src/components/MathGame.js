import React, { useState } from "react";
import "./MathGame.css";

const levels = {
  easy: "簡單",
  normal: "普通",
  hard: "困難"
};

const getRandomNumber = (max) => Math.floor(Math.random() * max);
const getRandomOperation = (level) => {
  if (level === "easy") return ["+", "-", "*", "/"][getRandomNumber(4)];
  return ["+", "-", "*", "/"][getRandomNumber(4)];
};

const generateQuestion = (level) => {
  let a, b, op, answer;

  op = getRandomOperation(level);

  if (level === "easy") {
    // 簡單：十位數加減、個位數乘除（整除）
    if (op === "+" || op === "-") {
      a = getRandomNumber(99) + 1; 
      b = getRandomNumber(100);
      if (op === "-" && a < b) [a, b] = [b, a];
      answer = op === "+" ? a + b : a - b;
    } 
    else {
      b = getRandomNumber(8) + 2; // 2~9
      answer = getRandomNumber(10); 
      a = answer * b;
      if (op === "*") answer = a * b;
    }
  } else if (level === "normal") {
    // 普通：百位加減、1~2位數乘除（整除）
    if (op === "+" || op === "-") {
      a = getRandomNumber(999) + 1; 
      b = getRandomNumber(999) + 1;
      if (op === "-" && a < b) [a, b] = [b, a];
      answer = op === "+" ? a + b : a - b;
    } else {
      b = getRandomNumber(18) + 2; // 2~19
      answer = getRandomNumber(20);
      a = answer * b;
      if (op === "*") answer = a * b;
    }
  } else {
    // 困難：百位加減、2位數*2位數乘法、2位數除法（取小數）
    if (op === "+" || op === "-") {
      a = getRandomNumber(900) + 100;
      b = getRandomNumber(900) + 100;
      if (op === "-" && a < b) [a, b] = [b, a];
      answer = op === "+" ? a + b : a - b;
    } else if (op === "*") {
      a = getRandomNumber(90) + 10;
      b = getRandomNumber(90) + 10;
      answer = a * b;
    } else {
      b = getRandomNumber(90) + 10;
      answer = (Math.random() * 90 + 10).toFixed(2); // 小數答案
      a = (b * answer).toFixed(2);
      a = parseFloat(a);
    }
  }

  return { a, b, op, answer };
};

const MathGame = ({ setGame }) => {
  const [level, setLevel] = useState(null);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setQuestion(generateQuestion(selectedLevel));
    setScore(0);
    setRound(0);
    setGameOver(false);
    setUserAnswer("");
  };

  const checkAnswer = () => {
    let correct =
      level === "hard" && question.op === "/"
        ? parseFloat(userAnswer).toFixed(2) === parseFloat(question.answer).toFixed(2)
        : parseInt(userAnswer) === question.answer;

    if (correct) setScore(score + 1);

    if (round < 4) {
      setQuestion(generateQuestion(level));
      setRound(round + 1);
      setUserAnswer("");
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    startLevel(level);
  };

  if (!level) {
    return (
      <div className="math">
      <div className="math-game">
        <h1>🧮 數學小遊戲</h1>
        <p>請選擇難度：</p>
        {Object.entries(levels).map(([key, name]) => (
          <button
            key={key}
            onClick={() => startLevel(key)}
            className={`start-btn ${key}-btn`}
          >
            {name}
          </button>
        ))}
        <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
      </div>
      </div>
    );
  }

  return (
    <div className="math">
    <div className="math-game">
      <h1>🧮 {levels[level]}等級</h1>
      {!gameOver ? (
        <>
          <p className="question">
            {question.a} {question.op} {question.b} = ?
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") checkAnswer();
            }}
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
    </div>
  );
};

export default MathGame;
