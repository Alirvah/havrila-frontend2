import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Filer from "./filer/Filer";
import Home from "./home/home";
import NoteIndex from "./notes/NoteIndex";
import React from "react";
import Todo from "./todo/Todo";
import Wifi from "./wifi/Wifi";

export default function Notebooks() {
  return (
    <>
      <Switch>
        <Route path="/notes">
          <NoteIndex />
        </Route>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/filer">
          <Filer />
        </Route>
        <Route path="/wifi">
          <Wifi />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
