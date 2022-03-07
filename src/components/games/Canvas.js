import React, { useEffect } from "react";
import gameloop from "./game/gameloop";

export default function App() {
  useEffect(() => {
    gameloop();
  }, []);

  return <canvas id="myCanvas" style={{ border: "1px solid #d3d3d3" }} />;
}
