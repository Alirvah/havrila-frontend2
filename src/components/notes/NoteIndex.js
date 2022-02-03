import { API, NOTE_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notebook from "./Notebooks";
import Notes from "./Notes";
import Quill from "./Quill";
import axios from "axios";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noteBox: {
    display: "flex",
    justifyContent: "flex-start",
  },
  notes: {
    marginRight: "1em",
  },
  noteBar: {
    marginBottom: "1em",
  },
}));

export default function Note() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const refresh = useSelector((store) => store.refresh);
  const active_notebook = useSelector((store) => store.active_notebook);

  useEffect(() => {
    axios.get(NOTE_URL + API.NOTEBOOK).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NOTEBOOKS", payload: r.data.reverse() });
        dispatch({ type: "ACTIVE_NOTEBOOK", payload: active_notebook });
        setLoading(false);
      }
    });
    // eslint-disable-next-line
  }, [refresh]);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <div className={classes.noteBar}>
        <Notebook />
      </div>
      <div className={classes.noteBox}>
        <div className={classes.notes}>
          <Notes />
        </div>
        <div>
          <Quill />
        </div>
      </div>
    </>
  );
}
