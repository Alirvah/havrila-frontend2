import { API, HOST, NOTE_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { getApi } from "../../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { postApi } from "../../api/api";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  button: {
    textTransform: "none",
  },
}));

const Notes = () => {
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);
  const notebooks = useSelector((store) => store.notebooks);
  const active_notebook = useSelector((store) => store.active_notebook);

  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const addNewNote = () => {
    //const title = prompt("Note:");
    if (newNote) {
      axios
        .post(NOTE_URL + API.NOTES, {
          title: newNote,
          content: "<p><br></p>".repeat(20),
          starred: false,
          notebook:
            NOTE_URL + API.NOTEBOOK + notebooks[active_notebook].id + "/",
        })
        .then((e) => {
          dispatch({ type: "ACTIVE_NOTE", payload: 0 });
          dispatch({ type: "SET_REFRESH" });
          handleClose();
        });
    }
  };

  const handleChange = (event, newValue) => {
    if (notes.length > newValue) {
      dispatch({ type: "ACTIVE_NOTE", payload: newValue });
      dispatch({ type: "SET_QUILL", payload: notes[newValue].content });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewNote("");
  };

  if (!notes) return <div>Loading...</div>;

  return (
    <div className={classes.root}>
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={active_note}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {notes &&
          notes.map((e) => (
            <Tab
              key={e.id}
              className={classes.button}
              label={e.title}
              //{...a11yProps(e.id)}
            />
          ))}
        {notebooks.length > 0 && (
          <Tab
            className={classes.button}
            label="+"
            // {...a11yProps(999)}
          />
        )}
      </Tabs>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note name"
            type="text"
            fullWidth
            onChange={(e) => setNewNote(e.target.value)}
            value={newNote}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewNote} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Notes;
