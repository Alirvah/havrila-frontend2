import { API, NOTE_URL } from "../../config/constants";
import { useDispatch, useSelector } from "react-redux";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import React from "react";
import axios from "axios";

const Notes = () => {
  const notes = useSelector((store) => store.note.notes);
  const active_note = useSelector((store) => store.note.active_note);
  const show_notes = useSelector((store) => store.note.show_notes);
  const show_notebooks = useSelector((store) => store.note.show_notebooks);
  const loaded = useSelector((store) => store.note.loaded);
  const notebooks = useSelector((store) => store.note.notebooks);
  const active_notebook = useSelector((store) => store.note.active_notebook);

  const dispatch = useDispatch();

  const newNote = () => {
    const title = prompt("Note:");
    if (title) {
      axios
        .post(NOTE_URL + API.NOTES, {
          title: title,
          content: "<p><br></p>".repeat(20),
          starred: false,
          notebook:
            NOTE_URL + API.NOTEBOOK + notebooks[active_notebook].id + "/",
        })
        .then((e) => {
          dispatch({ type: "ACTIVE_NOTEBOOK", payload: active_notebook });
          dispatch({ type: "SET_REFRESH" });
          dispatch({ type: "SHOW_QUILL", payload: false });
        });
    }
  };

  const handleChange = (newValue) => {
    dispatch({ type: "ACTIVE_NOTE", payload: newValue });
    dispatch({ type: "SET_QUILL", payload: notes[newValue].content });
    dispatch({ type: "SHOW_QUILL", payload: true });
    dispatch({ type: "SHOW_NOTES", payload: false });
  };

  if (!notes) return <div>Loading...</div>;

  return (
    <ul>
      {!show_notes & !show_notebooks ? (
        <li
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => {
            dispatch({ type: "SHOW_NOTES", payload: true });
            dispatch({ type: "SHOW_QUILL", payload: false });
          }}
        >
          <b>Note:</b> {notes[active_note]?.title}
        </li>
      ) : (
        <>
          {loaded & show_notes ? (
            <>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => newNote()}
              >
                <AddCircleIcon />
                <span>Note</span>
              </li>
              {notes &&
                notes.map((e, i) => (
                  <li key={i} onClick={() => handleChange(i)}>
                    {e.title}
                  </li>
                ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </ul>
  );
};

export default Notes;
