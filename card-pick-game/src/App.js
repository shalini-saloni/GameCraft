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
  
    // Wait for the card to flip back before resetting the number
    setTimeout(() => {
      setSelectedCard(null); // Unselect the card 
      
      // Wait for the card flip animation to complete, then reset the number
      setTimeout(() => {
        if (nextTurns === 0) {
          setGameOver(true); // Game over after all turns are used
        } else {
          const newNumber = generateRandomNumber();
          setRandomNumber(newNumber);
          resetCards(newNumber); // Reset the cards for the next round
        }
      }, 500); // Delay to allow card to flip back 
    }, 1000); // Wait before flipping the card back
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