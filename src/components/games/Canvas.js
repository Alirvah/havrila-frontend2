import React from "react";
import { Link } from "react-router-dom";
import { CANVAS_ITEMS } from "../../../src/config/constants";

export default function Canvas() {
  return (
    <>
      <ul style={{ textAlign: "center" }}>
        {CANVAS_ITEMS.map((item) => (
          <Link to={`/${item}`} key={item}>
            <li>{item[0].toUpperCase() + item.substring(1)}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
