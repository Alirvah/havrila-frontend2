import "./maincss.css";
import "../api/api";

import { API, HOST } from "../config/constants";
import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { useDispatch } from "react-redux";

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "10px", //TODO
  },
  title: {
    flexGrow: 1,
  },
};

export default function FormPropsTextFields() {
  const classes = useStyles;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cred, setCred] = useState({ usr: "", pwd: "" });

  const dispatch = useDispatch();

  const login = (ev) => {
    ev.preventDefault();
    setLoading(true);

    axios
      .post(HOST + API.TOKEN, {
        username: cred.usr,
        password: cred.pwd,
      })
      .then((r) => {
        if (r.data) {
          localStorage.setItem("token", r.data.access);
          localStorage.setItem("tokenRefresh", r.data.refresh);
          dispatch({ type: "SAVEUSER", payload: cred.usr });
          dispatch({ type: "SAVETOKEN", payload: r.data.access });
        }
      });
  };

  const handleChange = (prop) => (e) => {
    setCred({ ...cred, [prop]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>

      <div className="App">
        <header className="App-header">
          <div className="Login">
            <form>
              <TextField
                variant="standard"
                placeholder="Username"
                margin="normal"
                required
                onChange={handleChange("usr")}
                value={cred.usr}
              />
              <br />
              <TextField
                variant="standard"
                placeholder="Password"
                margin="normal"
                required
                type="password"
                onChange={handleChange("pwd")}
                value={cred.pwd}
              />

              <div className="Button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={login}
                >
                  {!loading ? (
                    <Typography>Log In</Typography>
                  ) : (
                    <Typography>Loading...</Typography>
                  )}
                </Button>
              </div>
            </form>
          </div>
          <Dialog
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Something went wrong
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(!open)} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </header>
      </div>
    </div>
  );
}
