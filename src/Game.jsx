import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [arrowPosition, setArrowPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [tries, setTries] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const barWidth = 400;
  const perfectZone = 10; 
  const goodZone = 50;    

  useEffect(() => {
    if (isMoving && arrowPosition < barWidth && !gameOver) {
      const timer = setTimeout(() => {
        setArrowPosition(prev => prev + 5);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [arrowPosition, isMoving, gameOver]);

  const startStopGame = () => {
    if (isMoving) {
      setIsMoving(false);
      checkScore();
    } else {
      setArrowPosition(0);
      setIsMoving(true);
      setMessage('');
    }
  };

  const checkScore = () => {
    if (tries <= 0) return;

    const middle = barWidth / 2;
    const distance = Math.abs(arrowPosition - middle);
    let currentPoints = 0;

   
    if (distance <= perfectZone) {
      currentPoints = 100;
      setMessage('Perfect! 🎯');
    } else if (distance <= goodZone) {
      currentPoints = 50;
      setMessage('Good! 😊');
    } else {
      currentPoints = 0;
      setMessage('Try Again! 😢');
    }

    const newTotalScore = score + currentPoints;
    setScore(newTotalScore);
    
   
    if (newTotalScore > highScore) {
      setHighScore(newTotalScore);
    }

    const remainingTries = tries - 1;
    setTries(remainingTries);

    if (remainingTries === 0) {
      setGameOver(true);
    }
  };

  const playAgain = () => {
    setArrowPosition(0);
    setIsMoving(false);
    setTries(3);
    setScore(0);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Arrow Game</h1>
      <div className="instructions">
        <p>Stop the arrow in the middle for maximum points!</p>
        <ul>
          <li>Perfect (100 points): Stop in black zone</li>
          <li>Good (50 points): Stop near the middle</li>
          <li>Miss (0 points): Too far from middle</li>
        </ul>
      </div>
      <div className="bar">
        <div className="score-label low">0</div>
        <div className="score-label medium">50</div>
        <div className="score-label high">100</div>
        <div className="middle-zone"></div>
        <div className="arrow" style={{ left: `${arrowPosition}px` }}></div>
      </div>
      <button 
        onClick={startStopGame} 
        disabled={gameOver}
        className="game-button"
      >
        {isMoving ? 'Stop!' : 'Start'}
      </button>
      <div className="score-container">
        <div className="score">
          <p>Tries Left: {tries}</p>
          <p>Current Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
      </div>
      {gameOver && (
        <button onClick={playAgain} className="play-again-button">
          Play Again
        </button>
      )}
      <div className="message">{message}</div>
    </div>
  );
};

export default Game;
