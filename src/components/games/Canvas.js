import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const style = {
  marginRight: "1rem",
  marginBottom: "1rem",
};

export default function Canvas() {
  const [test, setTest] = useState(null);
  function motion(event) {
    setTest(
      "Accelerometer: " +
        event.accelerationIncludingGravity.x +
        ", " +
        event.accelerationIncludingGravity.y +
        ", " +
        event.accelerationIncludingGravity.z
    );
  }
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", motion, false);
  } else {
    console.log("DeviceMotionEvent is not supported");
  }
  return (
    <>
      <Link to="/canvas/balls">
        <Button style={style} variant="contained" color="primary">
          Balls
        </Button>
      </Link>
      <Link to="/canvas/planets">
        <Button style={style} variant="contained" color="primary">
          Planets
        </Button>
      </Link>
      <p>{test}</p>
      <br />
    </>
  );
}
