import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import balls from "./balls/balls";
import carpet from "./carpet/carpet";
import clock from "./clock/clock";
import cube from "./cube/cube";
import planets from "./planets/planets";
import ray from "./ray/ray";
import runner from "./runner/runner";
import stars from "./stars/stars";

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
      case "carpet":
        game = carpet(type);
        break;
      default:
        game = planets(type);
    }
    return () => {
      clearInterval(game);
    };
  }, [type]);

  return (
    <>
      <ul>
        <Link to="/canvas">
          <li style={{ textAlign: "center", backgroundColor: "#002d5b" }}>
            Back
          </li>
        </Link>
      </ul>
      <canvas id={type} />
    </>
  );
}
