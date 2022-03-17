import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { CANVAS_ITEMS } from "../../../src/config/constants";

const style = {
  marginRight: "1rem",
  marginBottom: "1rem",
};

export default function Canvas() {
  return (
    <>
      {CANVAS_ITEMS.map((item) => (
        <Link to={`/canvas/${item}`}>
          <Button style={style} variant="contained" color="primary">
            {item[0].toUpperCase() + item.substring(1)}
          </Button>
        </Link>
      ))}
      <br />
    </>
  );
}
