import { API, HOST, URL } from "../../config/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { getApi } from "../../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { postApi } from "../../api/api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  button: {
    textTransform: "none",
  },
}));

const Notes = () => {
  const notes = useSelector((store) => store.notes);
  const active_note = useSelector((store) => store.active_note);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch({ type: "ACTIVE_NOTE", payload: newValue });
    dispatch({ type: "SET_QUILL", payload: notes[newValue].content });
  };

  useEffect(() => {
    // axios.get(URL + API.NOTES + "?notebook=" + 1).then((r) => {
    //   r.data && setNotes(r.data);
    // });
  }, []);

  if (!notes) return <div>Loading...</div>;

  return (
    <div className={classes.root}>
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={active_note}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {notes &&
          notes.map((e) => (
            <Tab
              key={e.id}
              className={classes.button}
              label={e.title}
              {...a11yProps(e.id)}
            />
          ))}
        <Tab className={classes.button} label="+" {...a11yProps(999)} />
      </Tabs>
    </div>
  );
};

export default Notes;
