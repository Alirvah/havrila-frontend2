import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Login";
import React from "react";
import { Routes } from "react-router-dom";
import weappJwt from "../src/helper/tokenDecode";
import { Route } from "react-router-dom";
import Home from "./components/Home";

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
    <>
      {token ? (
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      ) : window.location.href.includes("/canvas/runner") ? (
        <div></div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
