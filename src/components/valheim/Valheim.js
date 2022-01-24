import { API, SYSTEM_URL, SYSTEM_URL_2 } from "../../config/constants";
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
import { useSelector } from "react-redux";

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
  const [online, setOnline] = useState(null);
  const groups = useSelector((store) => store.groups) || "";

  const classes = useStyles();

  useEffect(() => {
    setError(null);
    setMessage(null);
    const getStateAxios = () => {
      axios
        .post(SYSTEM_URL + API.EC2, { instance: "valheim", action: "state" })
        .then((r) => {
          if (r.data) {
            setState(r.data);
            setInstanceType(r.data.type);
          }
        });
      axios.post(SYSTEM_URL + API.S3_BACKUP, {}).then((r) => {
        if (r.data) {
          setBackups(r.data);
        }
      });
      axios.get(SYSTEM_URL_2 + API.ONLINE, {}).then((r) => {
        if (r.data) {
          setOnline(r.data);
        }
      });
      if (instanceTypes.length <= 0) {
        axios.post(SYSTEM_URL + API.GET_INSTANCE_TYPES, {}).then((r) => {
          if (r.data) {
            setInstanceTypes(r.data.types);
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
        instance: "valheim",
      })
      .then((r) => {
        if (r.data) {
          setState("refresh");
          setMessage("Done");
        }
      })
      .catch((e) => {
        e?.data?.status
          ? setError(e.data.status)
          : setError("something went wrong");
      });
  };

  const handleChangeInstanceType = (event) => {
    setInstanceType(event.target.value);
  };

  const handleStart = () => {
    axios
      .post(SYSTEM_URL + API.EC2, { instance: "valheim", action: "start" })
      .then((r) => {
        if (r.data) {
          setState(r.data);
        }
      });
  };

  const handleStop = () => {
    axios
      .post(SYSTEM_URL + API.EC2, { instance: "valheim", action: "stop" })
      .then((r) => {
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
          <Typography>
            <h2>Valheim</h2>
          </Typography>
          {renderSwitch(state.status)}
          <Typography>IP Address: {state.ip}</Typography>
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
              {state.type}
            </Button>
          </div>
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
                {"Please first stop the instance"}
              </DialogContentText>
              <FormControl className={classes.formControl}>
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
                  {instanceTypes
                    .filter(
                      (e) => groups.includes("admin") || !e.includes("large")
                    )
                    .map((instance, i) => (
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
              <Button
                onClick={changeInstanceType}
                disabled={
                  instanceType === state.type || state.status === "running"
                }
                color="primary"
                autoFocus
              >
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
