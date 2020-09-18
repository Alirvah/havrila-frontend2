import { API, HOST, NOTE_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const Notebooks = () => {
  const notebooks = useSelector((store) => store.notebooks);
  const active_notebook = useSelector((store) => store.active_notebook);
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);
  const refresh = useSelector((store) => store.refresh);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newNotebook, setNewNotebook] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (notebooks.length > 0) {
      axios
        .get(
          NOTE_URL + API.NOTES + "?notebook=" + notebooks[active_notebook].id
        )
        .then((re) => {
          if (re.data.length > 0) {
            dispatch({ type: "SET_NOTES", payload: re.data });
            dispatch({
              type: "SET_QUILL",
              payload: re.data.length >= 1 && re.data[0].content,
            });
          } else {
            dispatch({ type: "SET_NOTES", payload: [] });
          }
        })
        .catch((e) => alert(e));
    }
    setLoading(false);
  }, [refresh]);

  const addNotebook = () => {
    if (newNotebook) {
      axios
        .post(NOTE_URL + API.NOTEBOOK, { title: newNotebook })
        .then((r) => {
          dispatch({ type: "SET_REFRESH" });
          handleClose();
        })
        .catch((e) => alert(e));
    }
  };

  const handleChange = (event, newValue) => {
    if (notebooks.length > newValue) {
      dispatch({ type: "ACTIVE_NOTEBOOK", payload: newValue });
      axios
        .get(NOTE_URL + API.NOTES + "?notebook=" + notebooks[newValue].id)
        .then((re) => {
          if (re.data.length > 0) {
            dispatch({ type: "SET_NOTES", payload: re.data });
            dispatch({ type: "ACTIVE_NOTE", payload: 0 });
            dispatch({
              type: "SET_QUILL",
              payload: re.data.length >= 1 && re.data[0].content,
            });
          } else {
            dispatch({ type: "SET_NOTES", payload: [] });
            dispatch({ type: "SET_QUILL", payload: "<p><br></p>".repeat(20) });
          }
        })
        .catch((e) => alert(e));
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewNotebook("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Paper square>
        <Tabs
          value={active_notebook}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          {notebooks &&
            notebooks.map((e) => <Tab key={e.id} label={e.title} />)}
          <Tab label="+" />
        </Tabs>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Notebook</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Notebook name"
            type="text"
            fullWidth
            onChange={(e) => setNewNotebook(e.target.value)}
            value={newNotebook}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNotebook} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notebooks;
