import React, { useEffect } from "react";
import cube from "./cubes/cube";

export default function Cube() {
  useEffect(() => {
    const game = cube("cubeCanvas");
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="cubeCanvas" style={{ border: "1px solid #d3d3d3" }} />;
}
