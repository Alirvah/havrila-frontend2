import React, { useEffect } from "react";
import balls from "./balls/balls.js";

export default function Balls() {
  useEffect(() => {
    const game = balls();
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="ballsCanvas" style={{ border: "1px solid #d3d3d3" }} />;
}
