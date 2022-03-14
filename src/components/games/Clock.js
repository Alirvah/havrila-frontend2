import React, { useEffect } from "react";
import clock from "./clock/clock";

export default function Ray() {
  useEffect(() => {
    const game = clock("clock");
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id="clock" />;
}
