import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Notebook from "./Notebooks";
import Notes from "./Notes";
import Quill from "./Quill";
import axios from "axios";

export default function Note() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const refresh = useSelector((store) => store.refresh);
  const active_notebook = useSelector((store) => store.active_notebook);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    axios.get(URL + API.NOTEBOOK).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NOTEBOOKS", payload: r.data.reverse() });
        dispatch({ type: "ACTIVE_NOTEBOOK", payload: active_notebook });
        setLoading(false);
      }
    });
  }, [refresh]);

  if (loading) {
    return <>loading..</>;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Notebook />
          <br />
        </Grid>
        <Grid item xs={3}>
          <Notes />
        </Grid>
        <Grid item xs={9}>
          <Quill />
        </Grid>
      </Grid>
    </>
  );
}
