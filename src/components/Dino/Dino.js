import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

export const Dino = () => { 
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  //managing jump activity upon key press
  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList != "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
      //300 indicates 300 millisecond for which dinosaur will be in air
    }
  };

  // Start or restart game on any key press
  useEffect(() => {
    const handleKeyPress = () => {
      if (!isGameStarted || isGameOver) {
        setScore(0);
        setIsGameStarted(true);
        setIsGameOver(false);
      } else {
        jump();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isGameStarted, isGameOver]);

  // Collision detection and game loop
  useEffect(() => {
    if (!isGameStarted) return; // Skip game loop if not started

    const isAlive = setInterval(function () {
      // get current dino Y position
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        setFinalScore(score);
        setIsGameOver(true);
        setIsGameStarted(false); // End the game
      } else {
        setScore((prevScore) => prevScore + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [isGameStarted, score]);

  return (
    <div className="game">
      {isGameStarted ? (
        <>
          Score: {score}
          <div id="dino" ref={dinoRef}></div>
          <div id="cactus" ref={cactusRef}></div>
        </>
      ) : isGameOver ? (
        <div>
          <h2 className="font_style">Game Over! Your Final Score: {finalScore}</h2>
          <h3 className="font_style">Press any key to start a new game</h3>
        </div>
      ) : (
        <h2 className="font_style">Press any key to start the game</h2>
      )}
    </div>
  );
};
