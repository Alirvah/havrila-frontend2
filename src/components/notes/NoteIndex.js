import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Notebook from "./Notebooks";
import Notes from "./Notes";
import Quill from "./Quill";
import axios from "axios";

export default function Note() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(URL + API.NOTEBOOK).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NOTEBOOKS", payload: r.data.reverse() });
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <Grid item xs={12}>
        <Notebook />
        <br />
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <Notes />
        </Grid>
        <Grid item xs={10}>
          <Quill />
        </Grid>
      </Grid>
    </>
  );
}
