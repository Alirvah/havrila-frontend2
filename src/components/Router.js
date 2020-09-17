import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NoteIndex from "./notes/NoteIndex";
import React from "react";
import Todo from "./todo/Todo";

export default function Notebooks() {
  return (
    <>
      <Switch>
        <Route path="/notes">
          <NoteIndex />
        </Route>
        <Route path="/to-do">
          <Todo />
        </Route>
      </Switch>
    </>
  );
}
