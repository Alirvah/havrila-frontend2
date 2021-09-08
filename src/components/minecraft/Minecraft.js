import { API, SYSTEM_URL } from "../../config/constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  StepIcon,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  parrent: {
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  },
  button: {
    margin: "10px",
  },
  runningCircle: {
    color: "green",
  },
  formControl: {
    minWidth: 200,
  },
  error: {
    color: "red",
  },
  message: {
    color: "blue",
  },
  backups: {
    margin: "1em",
  },
}));

const Minecraft = () => {
  const [state, setState] = useState(null);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [instanceType, setInstanceType] = useState("");
  const [backups, setBackups] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    setError(null);
    setMessage(null);
    const getStateAxios = () => {
      axios.post(SYSTEM_URL + API.EC2, { action: "state" }).then((r) => {
        if (r.data) {
          setState(r.data);
          setInstanceType(r.data.type);
        }
      });
      if (instanceTypes.length <= 0) {
        axios.post(SYSTEM_URL + API.GET_INSTANCE_TYPES, {}).then((r) => {
          if (r.data) {
            setInstanceTypes(r.data.types);
          }
        });
      }
      if (instanceTypes.length <= 0) {
        axios.post(SYSTEM_URL + API.S3_BACKUP, {}).then((r) => {
          if (r.data) {
            setBackups(r.data);
          }
        });
      }
    };

    if (!state || state === "refresh") {
      getStateAxios();
    }
    const timer = setInterval(() => {
      getStateAxios();
    }, 60000);
    return () => clearInterval(timer);

    // eslint-disable-next-line
  }, [state]);

  const changeInstanceType = () => {
    setOpen(false);
    axios
      .post(SYSTEM_URL + API.CHANGE_INSTANCE_TYPES, {
        newInstance: instanceType,
      })
      .then((r) => {
        if (r.data) {
          setState("refresh");
          setMessage("Done");
        }
      })
      .catch((e) => {
        e?.status ? setError(e.status) : setError("something went wrong");
      });
  };

  const handleChangeInstanceType = (event) => {
    setInstanceType(event.target.value);
  };

  const handleStart = () => {
    axios.post(SYSTEM_URL + API.EC2, { action: "start" }).then((r) => {
      if (r.data) {
        setState(r.data);
      }
    });
  };

  const handleStop = () => {
    axios.post(SYSTEM_URL + API.EC2, { action: "stop" }).then((r) => {
      if (r.data) {
        setState(r.data);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setState("refresh");
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "running":
        return (
          <>
            <p>The server is running!</p>
            <PlayCircleFilledIcon
              fontSize="small"
              className={classes.runningCircle}
            />
          </>
        );
      case "stopped":
        return (
          <>
            <p>
              <StopIcon fontSize="small" color="error" />
              The server is down!
            </p>
          </>
        );
      default:
        return (
          <>
            <p>
              <StepIcon fontSize="small" />
              working...
            </p>
          </>
        );
    }
  };

  return (
    <>
      {!state || !instanceTypes ? (
        <p>loading...</p>
      ) : (
        <div className={classes.parrent}>
          <Typography>Minecraft Server State:</Typography>
          {renderSwitch(state.status)}
          <Typography>Instance type: {state.type}</Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              type="text"
              variant="contained"
              color="primary"
              disabled={state.status !== "stopped"}
              onClick={handleStart}
            >
              Start
            </Button>
            <Button
              className={classes.button}
              type="text"
              variant="contained"
              color="primary"
              disabled={state.status !== "running"}
              onClick={handleStop}
            >
              Stop
            </Button>
            <Button
              className={classes.button}
              type="text"
              variant="contained"
              color="primary"
              disabled={state === "refresh"}
              onClick={() => setState("refresh")}
            >
              Refresh
            </Button>
            <Button
              className={classes.button}
              type="text"
              variant="contained"
              color="primary"
              disabled={state === "refresh"}
              onClick={() => setOpen(true)}
            >
              Change Instance Type
            </Button>
            <Button
              className={classes.button}
              type="text"
              variant="outlined"
              color="primary"
              href="https://minecraft-world-download.s3.eu-central-1.amazonaws.com/world.tar.gz"
            >
              Download World
            </Button>
          </div>
          {backups && (
            <div className={classes.backups}>
              <Typography>Last backup: {backups.lastBackup}</Typography>
              <Typography>Last archive: {backups.lastArchive}</Typography>
            </div>
          )}
          <Typography>{message}</Typography>
          {error && <Typography className={classes.error}>{error}</Typography>}
          {message && (
            <Typography className={classes.message}>{message}</Typography>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Change instance type"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"Change instance type of a Minecraft server"}
              </DialogContentText>
              <FormControl
                className={classes.formControl}
                disabled={state.status !== "stopped"}
              >
                <InputLabel htmlFor="age-native-simple">
                  Instance Type
                </InputLabel>
                <Select
                  native
                  value={instanceType}
                  onChange={handleChangeInstanceType}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  {instanceTypes.map((instance, i) => (
                    <option key={i} value={instance}>
                      {instance}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={changeInstanceType} color="primary" autoFocus>
                Accept
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};
export default Minecraft;
