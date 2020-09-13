import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Notes from "./notes/NoteIndex";
import React from "react";

export default function Notebooks() {
  return (
    <>
      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
      </Switch>
    </>
  );
}
