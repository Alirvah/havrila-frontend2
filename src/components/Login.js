import "./maincss.css";

import { API, HOST, NOTE_URL } from "../config/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import tokenStorage from "../helper/tokenStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
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
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Havrila.net
          </Typography>
        </Toolbar>
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
