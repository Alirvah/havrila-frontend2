import { useDispatch, useSelector } from "react-redux";

import Drawer from "./components/Drawer";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import weappJwt from "../src/helper/tokenDecode";

function App() {
  const token = useSelector((state) => state.token) || null;
  const dispatch = useDispatch();

  const res = token ? weappJwt(token).exp : 0;
  const now = parseInt(Date.now() / 1000);

  if (res < now) {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  }

  return <Router>{token ? <Drawer /> : <Login />}</Router>;
}

export default App;
