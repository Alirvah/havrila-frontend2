import { API, NOTE_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import axios from "axios";

const Notebooks = () => {
  const notebooks = useSelector((store) => store.note.notebooks);
  const active_notebook = useSelector((store) => store.note.active_notebook);
  const show_notebooks = useSelector((store) => store.note.show_notebooks);
  const refresh = useSelector((store) => store.refresh);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SHOW_NOTES", payload: false });
    dispatch({ type: "SHOW_NOTEBOOKS", payload: true });
    dispatch({ type: "SHOW_QULL", payload: false });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (notebooks.length > 0) {
      dispatch({ type: "LOADED", payload: false });
      axios
        .get(
          NOTE_URL + API.NOTES + "?notebook=" + notebooks[active_notebook].id
        )
        .then((re) => {
          if (re.data.length > 0) {
            dispatch({ type: "SET_NOTES", payload: re.data });
          } else {
            dispatch({ type: "SET_NOTES", payload: [] });
          }
        })
        .catch((e) => alert(e));
    }
    dispatch({ type: "LOADED", payload: true });
    setLoading(false);
    // eslint-disable-next-line
  }, [refresh]);

  const addNotebook = () => {
    const title = prompt("Notebook:");
    if (title) {
      axios
        .post(NOTE_URL + API.NOTEBOOK, { title: title })
        .then((r) => {
          dispatch({ type: "SET_REFRESH" });
        })
        .catch((e) => alert(e));
    }
  };

  const handleChange = (newValue) => {
    dispatch({ type: "LOADED", payload: false });
    dispatch({ type: "ACTIVE_NOTEBOOK", payload: newValue });
    dispatch({ type: "SHOW_NOTES", payload: false });
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
          dispatch({ type: "LOADED", payload: true });
          dispatch({ type: "SHOW_NOTES", payload: true });
        } else {
          dispatch({ type: "SHOW_NOTES", payload: true });
          dispatch({ type: "LOADED", payload: true });
          dispatch({ type: "SET_NOTES", payload: [] });
          dispatch({ type: "SET_QUILL", payload: "<p><br></p>".repeat(20) });
        }
      })
      .catch((e) => alert(e));
    dispatch({ type: "SHOW_NOTEBOOKS", payload: false });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {!show_notebooks ? (
        <li
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#002d5b",
          }}
          onClick={() => {
            dispatch({ type: "SHOW_NOTEBOOKS", payload: true });
            dispatch({ type: "SHOW_NOTES", payload: false });
            dispatch({ type: "SHOW_QUILL", payload: false });
          }}
        >
          <b>Notebook:</b> {notebooks[active_notebook].title}
        </li>
      ) : (
        <>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => addNotebook()}
            key={0}
          >
            <AddCircleIcon />
            <span>Notebook</span>
          </li>
          {notebooks &&
            notebooks.map((e, index) => (
              <li onClick={() => handleChange(index)} key={e.id}>
                {e.title}
              </li>
            ))}
        </>
      )}
    </ul>
  );
};

export default Notebooks;
