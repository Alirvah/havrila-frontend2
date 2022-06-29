import { API, SYSTEM_URL, TODO_URL } from "../config/constants";
import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Admin from "./admin/Admin";
import Canvas from "./games/Canvas";
import CanvasGame from "./games/CanvasGame";
import Filer from "./filer/Filer";
import Landing from "./landing/Landing";
import Meetings from "./meetings/Meetings";
import MenuIcon from "@mui/icons-material/Menu";
import Minecraft from "./minecraft/Minecraft";
import Note from "./notes/NoteIndex";
import Sensor from "./sensors/Sensor";
import Todo from "./todo/Todo";
import Valheim from "./valheim/Valheim";
import Workadventure from "./workadventure/Workadventure";
import Year from "./year/Year";
import axios from "axios";

export default function Home() {
  const groups = useSelector((store) => store.groups) || "";
  const navbar = useSelector((store) => store.navbar);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(TODO_URL + API.TODO).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NUMBER_OF_TODOS", payload: r.data.length });
      }
    });
    axios.get(SYSTEM_URL + API.GET_GROUPS).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_USER_GROUPS", payload: r.data.groups });
      }
    });
    // eslint-disable-next-line
  }, []);

  const hideNavbar = () => {
    dispatch({
      type: "NAVBAR",
      payload: false,
    });
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="header">
        <div
          className="nav-button"
          onClick={() => dispatch({ type: "NAVBAR", payload: !navbar })}
        >
          <MenuIcon />
        </div>
        <div className="nav-button" onClick={logout}>
          <Link to="/">Logout</Link>
        </div>
      </div>
      <div className="home-root">
        {navbar && (
          <nav>
            <ul className="nav-bar">
              {groups.includes("notes") &&
                ["Notes"].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
              {groups.includes("todo") &&
                ["Todo"].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
              {groups.includes("admin") &&
                [
                  "Filer",
                  "Sensors",
                  "Devices",
                  "Admin",
                  "Canvas",
                  "Year",
                  "Meetings",
                ].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
              {groups.includes("minecraft") &&
                ["Minecraft"].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
              {groups.includes("valheim") &&
                ["Valheim"].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
              {groups.includes("workadventure") &&
                ["Workadventure"].map((text, index) => (
                  <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                    <li key={index} onClick={hideNavbar}>
                      {text}
                    </li>
                  </Link>
                ))}
            </ul>
          </nav>
        )}
        {!groups.length ? (
          <p>loading...</p>
        ) : (
          <div className="content">
            <Routes>
              {groups.includes("admin") && (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="filer" element={<Filer />} />
                  <Route path="sensors" element={<Sensor />} />
                  <Route path="canvas" element={<Canvas />} />
                  <Route path="balls" element={<CanvasGame type="balls" />} />
                  <Route
                    path="planets"
                    element={<CanvasGame type="planets" />}
                  />
                  <Route path="balls" element={<CanvasGame type="balls" />} />
                  <Route path="cube" element={<CanvasGame type="cube" />} />
                  <Route path="ray" element={<CanvasGame type="ray" />} />
                  <Route path="clock" element={<CanvasGame type="clock" />} />
                  <Route path="stars" element={<CanvasGame type="stars" />} />
                  <Route path="runner" element={<CanvasGame type="runner" />} />
                  <Route path="carpet" element={<CanvasGame type="carpet" />} />
                  <Route path="year" element={<Year />} />
                  <Route path="minecraft" element={<Minecraft />} />
                  <Route path="workadventure" element={<Workadventure />} />
                  <Route path="valheim" element={<Valheim />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="meetings" element={<Meetings />} />
                </>
              )}
              {groups.includes("notes") && (
                <Route path="notes" element={<Note />} />
              )}
              {groups.includes("todo") && (
                <Route path="todo" element={<Todo />} />
              )}
              {groups.includes("valheim") && (
                <Route path="valheim" element={<Valheim />} />
              )}
              {groups.includes("minecraft") && (
                <Route path="minecraft" element={<Valheim />} />
              )}
              {groups.includes("workadventure") && (
                <Route path="workadventure" element={<Workadventure />} />
              )}
            </Routes>
          </div>
        )}
      </div>
    </>
  );
}
