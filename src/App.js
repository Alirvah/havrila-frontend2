import Drawer from "./components/Drawer";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token);

  return <Router>{token ? <Drawer /> : <Login />}</Router>;
}

export default App;
