import { API, SYSTEM_URL } from "../../config/constants";
import { Button, StepIcon, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  parrent: {
    width: "30%",
  },
  buttons: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  runningCircle: {
    color: "green",
  },
}));

const Minecraft = () => {
  const [state, setState] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const getStateAxios = () => {
      axios.post(SYSTEM_URL + API.EC2, { action: "state" }).then((r) => {
        if (r.data) {
          setState(r.data.status);
        }
      });
    };

    if (!state || state === "refresh") {
      getStateAxios();
    }
    const timer = setInterval(() => {
      getStateAxios();
    }, 300000); //5 min
    return () => clearInterval(timer);

    // eslint-disable-next-line
  }, [state]);

  const handleStart = () => {
    axios.post(SYSTEM_URL + API.EC2, { action: "start" }).then((r) => {
      if (r.data) {
        setState(r.data.status);
      }
    });
  };

  const handleStop = () => {
    axios.post(SYSTEM_URL + API.EC2, { action: "stop" }).then((r) => {
      if (r.data) {
        setState(r.data.status);
      }
    });
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "running":
        return (
          <>
            <PlayCircleFilledIcon
              fontSize="small"
              className={classes.runningCircle}
            />
            <p>The server is running!</p>
          </>
        );
      case "stopped":
        return (
          <>
            <StopIcon fontSize="small" color="error" />
            <p>The server is down!</p>
          </>
        );
      default:
        return (
          <>
            <StepIcon fontSize="small" />
            <p>working...</p>
          </>
        );
    }
  };

  return (
    <>
      {!state ? (
        <p>loading...</p>
      ) : (
        <div className={classes.parrent}>
          <Typography>Minecraft Server State:</Typography>
          {renderSwitch(state)}
          <div className={classes.buttons}>
            <Button
              type="text"
              variant="contained"
              color="primary"
              disabled={state !== "stopped"}
              onClick={handleStart}
            >
              Start
            </Button>
            <Button
              type="text"
              variant="contained"
              color="primary"
              disabled={state !== "running"}
              onClick={handleStop}
            >
              Stop
            </Button>
            <Button
              type="text"
              variant="contained"
              color="primary"
              disabled={state === "refresh"}
              onClick={() => setState("refresh")}
            >
              Refresh
            </Button>
            <Button
              type="text"
              variant="outlined"
              color="primary"
              href="https://minecraft-world-download.s3.eu-central-1.amazonaws.com/world.tar.gz"
            >
              Download World
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default Minecraft;
