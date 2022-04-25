import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Filer from "./filer/Filer";
import Canvas from "./games/Canvas";
import CanvasGame from "./games/CanvasGame";
import Note from "./notes/NoteIndex";
import Sensor from "./sensors/Sensor";
import Todo from "./todo/Todo";
import Year from "./year/Year";
import axios from "axios";
import Minecraft from "./minecraft/Minecraft";
import Valheim from "./valheim/Valheim";
import { API, SYSTEM_URL, TODO_URL } from "../config/constants";
import MenuIcon from "@mui/icons-material/Menu";

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
              {groups.includes("admin") &&
                [
                  "Notes",
                  "Todo",
                  "Filer",
                  "Sensors",
                  "Devices",
                  "Admin",
                  "Canvas",
                  "Year",
                ].map((text, index) => (
                  <li key={index} onClick={hideNavbar}>
                    <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                      {text}
                    </Link>
                  </li>
                ))}
              {groups.includes("minecraft") &&
                ["minecraft"].map((text, index) => (
                  <li key={index} onClick={hideNavbar}>
                    <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                      {text}
                    </Link>
                  </li>
                ))}
              {groups.includes("valheim") &&
                ["valheim"].map((text, index) => (
                  <li key={index} onClick={hideNavbar}>
                    <Link to={`/${text.toLocaleLowerCase()}`} key={index}>
                      {text}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        )}
        <div className="content">
          <Routes>
            {groups.includes("admin") && (
              <>
                <Route path="notes" element={<Note />} />
                <Route path="todo" element={<Todo />} />
                <Route path="filer" element={<Filer />} />
                <Route path="sensors" element={<Sensor />} />
                <Route path="canvas" element={<Canvas />} />
                <Route path="balls" element={<CanvasGame type="balls" />} />
                <Route path="planets" element={<CanvasGame type="planets" />} />
                <Route path="balls" element={<CanvasGame type="balls" />} />
                <Route path="cube" element={<CanvasGame type="cube" />} />
                <Route path="ray" element={<CanvasGame type="ray" />} />
                <Route path="clock" element={<CanvasGame type="clock" />} />
                <Route path="stars" element={<CanvasGame type="stars" />} />
                <Route path="runner" element={<CanvasGame type="runner" />} />
                <Route path="year" element={<Year />} />
                <Route path="minecraft" element={<Minecraft />} />
                <Route path="valheim" element={<Valheim />} />
              </>
            )}
            {groups.includes("minecraft") && (
              <Route path="minecraft" element={<Minecraft />} />
            )}
            {groups.includes("valheim") && (
              <Route path="valheim" element={<Valheim />} />
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}
