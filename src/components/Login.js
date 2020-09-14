import { API, HOST, URL } from "../config/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import tokenStorage from "../helper/tokenStorage";

const useStyles = makeStyles((theme) => ({
  root2: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
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
          window.localStorage.setItem("token", r.data.access);
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

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={3}>
          <form className={classes.root2} noValidate autoComplete="off">
            <div>
              <TextField
                value={cred.usr}
                onChange={handleChange("usr")}
                id="standard-search"
                label="Username"
                type="text"
              />
              <TextField
                value={cred.pwd}
                onChange={handleChange("pwd")}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disableElevation
                onClick={login}
              >
                Log in
              </Button>
              {loading && <Typography>Loading...</Typography>}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
