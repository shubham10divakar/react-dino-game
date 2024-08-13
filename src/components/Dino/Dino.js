import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

export const Dino = () => {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList != "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  // Start game on any key press
  useEffect(() => {
    const handleKeyPress = () => {
      if (!isGameStarted) {
        setIsGameStarted(true);
      } else {
        jump();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isGameStarted]);

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
        alert("Game Over! Your Score : " + score);
        setScore(0);
        setIsGameStarted(false); // Reset game start
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
          Score : {score}
          <div id="dino" ref={dinoRef}></div>
          <div id="cactus" ref={cactusRef}></div>
        </>
      ) : (
        <h2>Press any key to start the game</h2>
      )}
    </div>
  );
};
