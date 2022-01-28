import "react-quill/dist/quill.snow.css";

import { API, NOTE_URL } from "../../config/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ReactQuill from "react-quill";
import axios from "axios";

const Quill = () => {
  const text = useSelector((store) => store.quill);
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);
  const notebooks = useSelector((store) => store.notebooks);
  const active_notebook = useSelector((store) => store.active_notebook);

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
          dispatch({ type: "ACTIVE_NOTEBOOK", payload: 0 });
          dispatch({ type: "SET_REFRESH" });
        })
        .catch((e) => alert("Note was not saved!!! \n" + e));
    }
  };

  if (!state) return <div>Loading...</div>;

  if (notebooks.length === 0) return <div></div>;

  if (notes.length <= 0 && notebooks.length !== 0)
    return (
      <Button
        type="text"
        variant="outlined"
        color="secondary"
        disableElevation
        onClick={handleDelete}
      >
        delete
      </Button>
    );

  return (
    <Grid container>
      <Grid item xs={6}>
        <Button
          type="text"
          variant="contained"
          color={state.readonly ? "default" : "primary"}
          disableElevation
          onClick={handleSave}
          disabled={state.readonly}
        >
          save
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="text"
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={handleDelete}
        >
          delete
        </Button>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
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
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Quill;
