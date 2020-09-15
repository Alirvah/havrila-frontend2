import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import axios from "axios";

const Notebooks = () => {
  const notebooks = useSelector((store) => store.notebooks);
  const active_notebook = useSelector((store) => store.active_notebook);
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);

  const refresh = useSelector((store) => store.refresh);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notebooks.length > 0) {
      axios
        .get(URL + API.NOTES + "?notebook=" + notebooks[active_notebook].id)
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
    const title = prompt("Note:");
    axios
      .post(URL + API.NOTEBOOK, { title: title })
      .then((r) => {
        dispatch({ type: "SET_REFRESH" });
      })
      .catch((e) => alert(e));
  };

  const handleChange = (event, newValue) => {
    if (notebooks.length > newValue) {
      dispatch({ type: "ACTIVE_NOTEBOOK", payload: newValue });
      axios
        .get(URL + API.NOTES + "?notebook=" + notebooks[newValue].id)
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
      addNotebook();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Paper square>
      <Tabs
        value={active_notebook}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        {notebooks && notebooks.map((e) => <Tab key={e.id} label={e.title} />)}
        <Tab label="+" />
      </Tabs>
    </Paper>
  );
};

export default Notebooks;
