import React, { useEffect } from "react";
import planets from "./ray/rays";

export default function Ray() {
  useEffect(() => {
    const game = planets("ray");
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="ray" />;
}
