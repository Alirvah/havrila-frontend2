import { useDispatch, useSelector } from "react-redux";

import Drawer from "./components/Drawer";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import weappJwt from "../src/helper/tokenDecode";
import { Route } from "react-router-dom";
import CanvasGame from "./components/games/CanvasGame";

const styles = {
  centerCanvas: {
    display: "flex",
    justifyContent: "center",
    marginTop: "100px",
  },
};

function App() {
  const token = useSelector((state) => state.token) || null;
  const dispatch = useDispatch();

  const res = token ? weappJwt(token).exp : 0;
  const now = parseInt(Date.now() / 1000);

  if (res < now) {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  }

  return (
    <Router>
      {token ? (
        <Drawer />
      ) : window.location.href.includes("/canvas/runner") ? (
        <Route path="/canvas/runner">
          <div style={styles.centerCanvas}>
            <CanvasGame style={styles.centerCanvas} type="runner" />
          </div>
        </Route>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
