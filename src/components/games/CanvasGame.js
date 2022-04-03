import React, { useEffect, useState } from "react";

import balls from "./balls/balls";
import planets from "./planets/planets";
import cube from "./cube/cube";
import ray from "./ray/ray";
import clock from "./clock/clock";
import stars from "./stars/stars";
import runner from "./runner/runner";

export default function CanvasGame({ type }) {
  useEffect(() => {
    let game;
    switch (type) {
      case "runner":
        game = runner(type);
        break;
      case "stars":
        game = stars(type);
        break;
      case "clock":
        game = clock(type);
        break;
      case "ray":
        game = ray(type);
        break;
      case "cube":
        game = cube(type);
        break;
      case "planets":
        game = planets(type);
        break;
      case "balls":
        game = balls(type);
        break;
      default:
        game = planets(type);
    }
    return () => {
      clearInterval(game);
    };
  }, []);

  return <canvas id={type} />;
}
