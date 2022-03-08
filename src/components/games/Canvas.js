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
      <br />
    </>
  );
}