import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const style = {
  marginRight: "1rem",
  marginBottom: "1rem",
};

export default function Canvas() {
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
      <Link to="/canvas/cube">
        <Button style={style} variant="contained" color="primary">
          Cube
        </Button>
      </Link>
      <Link to="/canvas/ray">
        <Button style={style} variant="contained" color="primary">
          Ray
        </Button>
      </Link>
      <Link to="/canvas/clock">
        <Button style={style} variant="contained" color="primary">
          Clock
        </Button>
      </Link>
      <br />
    </>
  );
}
