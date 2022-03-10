import React, { useEffect } from "react";
import planets from "./planets/planets";

export default function Planets() {
  useEffect(() => {
    const game = planets("planetCanvas");
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="planetCanvas" style={{ border: "1px solid #d3d3d3" }} />;
}
