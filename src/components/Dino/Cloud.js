import React, { useEffect, useState } from "react";
import cloudGif from '../../assets/gif/clouds.gif';

export const Cloud = ({ gameWidth, gameHeight }) => {
  const [position, setPosition] = useState(1 * gameWidth);
  const [topPosition, setTopPosition] = useState(1* (gameHeight / 4)); // Adjust cloud height range

//   useEffect(() => {
//     const moveCloud = () => {
//       setPosition(prev => (prev <= -200 ? gameWidth : prev - 2));
//     };

//     const interval = setInterval(moveCloud, 50);

//     return () => clearInterval(interval);
//   }, [gameWidth]);

  return (
    <img
      src={cloudGif}
      alt="Cloud"
      style={{
        position: "absolute",
        top: `${topPosition}px`,
        left: `${position}px`,
        width: "80px",
        height: "auto"
      }}
    />
  );
};
