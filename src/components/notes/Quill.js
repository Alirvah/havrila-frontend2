import { API, NOTE_URL } from "../../config/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import axios from "axios";

import ReactQuill from "react-quill";

const QuillComponent = () => {
  const text = useSelector((store) => store.note.quill);
  const notes = useSelector((store) => store.note.notes);
  const active_note = useSelector((store) => store.note.active_note);
  const show_quill = useSelector((store) => store.note.show_quill);
  const show_notebooks = useSelector((store) => store.note.show_notebooks);
  const notebooks = useSelector((store) => store.note.notebooks);
  const active_notebook = useSelector((store) => store.note.active_notebook);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    readonly: true,
    saved: false,
  });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { size: ["small", false, "large", "huge"] }],
      ["link", "image", "video", "formula"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const handleChange = (value, delta, source, editor) => {
    source === "user" && dispatch({ type: "SET_QUILL", payload: value });
    source === "api" && dispatch({ type: "SET_QUILL", payload: value });
  };

  const handleSave = () => {
    axios
      .patch(NOTE_URL + API.NOTES + notes[active_note].id + "/", {
        content: text,
      })
      .then((e) => {
        e.status === 200 && setState({ ...state, readonly: true });
        dispatch({ type: "SET_REFRESH" });
      })
      .catch((e) => alert("Note was not saved!!! \n" + e));
  };

  const handleDelete = () => {
    if (notes.length > 0) {
      if (
        window.confirm(
          `Are you really want to delete '${notes[active_note].title}' notebook?`
        )
      ) {
        axios
          .delete(NOTE_URL + API.NOTES + notes[active_note].id + "/")
          .then((e) => {
            dispatch({ type: "SET_QUILL", payload: "" });
            dispatch({ type: "SHOW_QUILL", payload: false });
            dispatch({ type: "SHOW_NOTES", payload: true });
            dispatch({ type: "SET_REFRESH" });
          })
          .catch((e) => alert("Note was not saved!!! \n" + e));
      }
    } else {
      window.confirm(
        `Are you really want to delete '${notebooks[active_notebook].title}' notebook?`
      );
      axios
        .delete(NOTE_URL + API.NOTEBOOK + notebooks[active_notebook].id + "/")
        .then((e) => {
          dispatch({ type: "SHOW_NOTES", payload: false });
          dispatch({ type: "SHOW_NOTEBOOKS", payload: true });
          dispatch({ type: "SET_REFRESH" });
        })
        .catch((e) => alert("Note was not saved!!! \n" + e));
    }
  };

  if (!state) return <div>Loading...</div>;

  if (notebooks.length === 0) return <div></div>;

  return (
    <div>
      {show_quill ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Button
              type="text"
              variant="contained"
              //color={state.readonly ? "default" : "primary"}
              disableElevation
              onClick={handleSave}
              disabled={state.readonly}
              style={{ color: "white" }}
            >
              save
            </Button>
            <Button
              type="text"
              variant="outlined"
              //color="secondary"
              disableElevation
              onClick={handleDelete}
            >
              delete
            </Button>
          </div>
          <div
            className="text-editor"
            //style={{ position: "relative" }}
            onDoubleClick={(e) => {
              setState({ ...state, readonly: false });
            }}
          >
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              placeholder="Compose an epic..."
              theme="snow"
              readOnly={state.readonly}
              style={{
                margin: "1rem",
              }}
            />
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          {notes.length <= 0 &&
            notebooks.length !== 0 &&
            !show_quill &&
            !show_notebooks && (
              <Button
                type="text"
                variant="outlined"
                disableElevation
                onClick={handleDelete}
                style={{ color: "red", margin: "1rem", width: "100%" }}
              >
                delete notebok
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default QuillComponent;
