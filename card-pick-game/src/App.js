import React, { useState, useEffect } from "react";
import "./App.css";

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const LuckyPick = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(5);
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetCards();
  }, []);

  const resetCards = (newRandomNumber) => {
    const correctCardIndex = Math.floor(Math.random() * 2);
    const newCards = [generateRandomNumber(), generateRandomNumber()];
    newCards[correctCardIndex] = newRandomNumber || randomNumber; 
    setCards(newCards);
    setSelectedCard(null);
  };

  
  const handleCardClick = (index) => {
    if (selectedCard !== null || gameOver) return;
  
    setSelectedCard(index);
    const isCorrect = cards[index] === randomNumber;
  
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    const nextTurns = turns - 1;
    setTurns(nextTurns);
  
    setTimeout(() => {
      setSelectedCard(null); 
      setTimeout(() => {
        if (nextTurns === 0) {
          setGameOver(true); 
        } else {
          const newNumber = generateRandomNumber();
          setRandomNumber(newNumber);
          resetCards(newNumber); 
        }
      }, 500); 
    }, 1000); 
  };
  
  

  const restartGame = () => {
    setScore(0);
    setTurns(5);
    setGameOver(false);
    setRandomNumber(generateRandomNumber());
    resetCards();
  };

  return (
    <div className="game-container">
      <h1>🎲 Lucky Pick 🎲</h1>
      <p className="info-text">Find the correct card with number: <span className="target-number">{randomNumber}</span></p>

      <div className="cards-container">
        {cards.map((num, index) => (
          <div
            key={index}
            className={`card ${selectedCard === index ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{num}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="score-box">
        <p>Score: {score}</p>
        <p>Turns Left: {turns}</p>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over! 🎉</h2>
          <p>Your Final Score: {score}</p>
          <button onClick={restartGame} className="restart-btn">Restart</button>
        </div>
      )}
    </div>
  );
};

export default LuckyPick;
