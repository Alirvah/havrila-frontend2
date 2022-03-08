import { API, HOST } from "../config/constants";
// Router has to be imported otherwise routing breaks
// eslint-disable-next-line
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Filer from "./filer/Filer";
import Home from "./home/home";
import Minecraft from "./minecraft/Minecraft";
import Valheim from "./valheim/Valheim";
import NoteIndex from "./notes/NoteIndex";
import React from "react";
import Sensor from "./sensors/Sensor";
import Todo from "./todo/Todo";
import Wifi from "./wifi/Devices";
import Canvas from "./games/Canvas";
import Balls from "./games/Balls";
import Planets from "./games/Planets";

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
        <Route path="/sensors">
          <Sensor />
        </Route>
        <Route path="/canvas">
          <Canvas />
          <Route path="/canvas/balls">
            <Balls />
          </Route>
          <Route path="/canvas/planets">
            <Planets />
          </Route>
        </Route>
        <Route path="/devices">
          <Wifi />
        </Route>
        <Route path="/minecraft">
          <Minecraft />
        </Route>
        <Route path="/valheim">
          <Valheim />
        </Route>
        <Route path="/admin">
          {() => window.open(HOST + API.ADMIN, "_blank")}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
