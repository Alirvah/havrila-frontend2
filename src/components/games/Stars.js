import React, { useEffect } from "react";
import stars from "./stars/stars";

export default function Ray() {
  useEffect(() => {
    const game = stars("stars");
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="stars" />;
}
