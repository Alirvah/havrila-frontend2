import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import axios from "axios";
import { getApi } from "../../api/api";
import { postApi } from "../../api/api";

const Notebooks = () => {
  const notebooks = useSelector((store) => store.notebooks);
  const active_notebook = useSelector((store) => store.active_notebook);
  const refresh = useSelector((store) => store.refresh);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get(URL + API.NOTEBOOK).then((r) => {
    //   r.data && setNotebooks(r.data);
    // });
    axios.get(URL + API.NOTES + "?notebook=" + 1).then((re) => {
      if (re.data) {
        dispatch({ type: "SET_NOTES", payload: re.data });
        dispatch({ type: "SET_QUILL", payload: re.data[0].content });
        setLoading(false);

        //dispatch({ type: "ACTIVE_NOTE", payload: active_note });
        // axios.get(URL + API.NOTES + "/" + 1).then((res) => {
        //   if (res.data) {
        //     dispatch({ type: "SET_QUILL", payload: res.data.content });
        //     setLoading(false);
        //   }
        // });
      }
    });
  }, [refresh]);

  const handleChange = (event, newValue) => {
    dispatch({ type: "ACTIVE_NOTEBOOK", payload: newValue });
    axios
      .get(URL + API.NOTES + "?notebook=" + notebooks[newValue].id)
      .then((re) => {
        if (re.data) {
          dispatch({ type: "SET_NOTES", payload: re.data });
          dispatch({ type: "ACTIVE_NOTE", payload: 0 });
          dispatch({ type: "SET_QUILL", payload: re.data[0].content });
          setLoading(false);

          //dispatch({ type: "ACTIVE_NOTE", payload: active_note });
          // axios.get(URL + API.NOTES + "/" + 1).then((res) => {
          //   if (res.data) {
          //     dispatch({ type: "SET_QUILL", payload: res.data.content });
          //     setLoading(false);
          //   }
          // });
        }
      });
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
