import "react-quill/dist/quill.snow.css";

import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { getApi, patchApi, postApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ReactQuill from "react-quill";
import axios from "axios";

const Quill = () => {
  const text = useSelector((store) => store.quill);
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    readonly: true,
    saved: false,
  });

  useEffect(() => {
    // axios.get(URL + API.NOTES + "/" + 1).then((r) => {
    //   r.data && setState({ ...state, text: r.data.content });
    // });
  }, []);

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
      .patch(URL + API.NOTES + "/" + notes[active_note].id + "/", {
        content: text,
      })
      .then((e) => {
        e.status === 200 && setState({ ...state, readonly: true });
        dispatch({ type: "SET_REFRESH" });
      })
      .catch((e) => alert("Note was not saved!!! \n" + e));
    setState({ ...state, readonly: true });
  };

  if (!state) return <div>Loading...</div>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          type="text"
          variant="contained"
          color={state.readonly ? "default" : "primary"}
          disableElevation
          onClick={handleSave}
        >
          save
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
          />{" "}
        </div>
      </Grid>
    </Grid>
  );
};

export default Quill;
