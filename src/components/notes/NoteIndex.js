import { API, NOTE_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notebook from "./Notebooks";
import Notes from "./Notes";
import axios from "axios";
import QuillComponent from "./Quill";

export default function Note() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const refresh = useSelector((store) => store.refresh);

  useEffect(() => {
    dispatch({ type: "LOADED", payload: false });
    axios.get(NOTE_URL + API.NOTEBOOK).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NOTEBOOKS", payload: r.data.reverse() });
        setLoading(false);
      }
    });
    dispatch({ type: "LOADED", payload: true });
    // eslint-disable-next-line
  }, [refresh]);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <Notebook />
      <Notes />
      <QuillComponent />
    </>
  );
}
