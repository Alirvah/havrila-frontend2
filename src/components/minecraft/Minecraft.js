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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";

import { useSelector } from "react-redux";
import Donate from "../../helper/Donation";

const useStyles = {
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
    minWidth: "200",
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
};

const Minecraft = () => {
  const [state, setState] = useState(null);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [instanceType, setInstanceType] = useState("");
  const [backups, setBackups] = useState(null);
  const [online, setOnline] = useState(null);
  const [logs, setLogs] = useState([]);
  const groups = useSelector((store) => store.groups) || "";

  const classes = useStyles;

  useEffect(() => {
    setError(null);
    setMessage(null);
    const getStateAxios = () => {
      axios
        .post(SYSTEM_URL + API.EC2, { instance: "minecraft", action: "state" })
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
      axios
        .get(SYSTEM_URL_2 + API.SERVER + "?server=minecraft", {})
        .then((r) => {
          if (r.data) {
            setLogs(r.data);
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
        instance: "minecraft",
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
      .post(SYSTEM_URL + API.EC2, { instance: "minecraft", action: "start" })
      .then((r) => {
        if (r.data) {
          setState(r.data);
        }
      });
  };

  const handleStop = () => {
    axios
      .post(SYSTEM_URL + API.EC2, { instance: "minecraft", action: "stop" })
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
              style={{ color: "#189c4f" }}
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
    <div style={{ margin: "1rem" }}>
      {!state || !instanceTypes ? (
        <p>loading...</p>
      ) : (
        <div className={classes.parrent}>
          <Typography>
            <h2>Minecraft</h2>
          </Typography>
          {renderSwitch(state.status)}
          <Typography>IP Address: {state.ip}</Typography>
          <ul>
            <li
              style={{
                display: `${state.status !== "stopped" ? "none" : "block"}`,
              }}
              onClick={handleStart}
            >
              Start
            </li>
            <li
              style={{
                display: `${state.status !== "running" ? "none" : "block"}`,
              }}
              onClick={handleStop}
            >
              Stop
            </li>
            <li
              style={{
                display: `${state.status === "refresh" ? "none" : "block"}`,
              }}
              onClick={() => setState("refresh")}
            >
              Refresh
            </li>
            <li
              style={{
                display: `${state.status === "refresh" ? "none" : "block"}`,
              }}
              onClick={() => setOpen(true)}
            >
              {state.type}
            </li>
            {/*<Button
              className={classes.button}
              type="text"
              variant="outlined"
              color="primary"
              href="https://minecraft-world-download.s3.eu-central-1.amazonaws.com/world.tar.gz"
            >
              Download World
            </Button>
            */}
          </ul>
          <Donate />
          {backups && (
            <div className={classes.backups}>
              <Typography>
                Last backup: {new Date(backups.lastBackup).toString()}
              </Typography>
              <Typography>
                Last archive to download:{" "}
                {new Date(backups.lastArchive).toString()}
              </Typography>
            </div>
          )}
          <Typography>{message}</Typography>
          {groups.includes("admin") &&
            online &&
            (() => {
              const now = new Date();
              const created_at = new Date(online.created_at);
              if (created_at > now.setMinutes(now.getMinutes() - 60)) {
                return (
                  <Typography>{`Online: ${online.name} - ${created_at}`}</Typography>
                );
              }
            })()}
          {error && <Typography className={classes.error}>{error}</Typography>}
          {message && (
            <Typography className={classes.message}>{message}</Typography>
          )}

          <ul style={{ border: "1px solid #1e4976" }}>
            {logs.slice(0, 10).map((log) => (
              <li style={{ borderBottom: "1px solid #1e4976", cursor: "auto" }}>
                <b>{log.created_at.split(".")[0].replace("T", " - ")}</b>: user{" "}
                <u>{log.user}</u> {log.operation}{" "}
                {!log.operation.includes("changed") && "minecraft server"}
              </li>
            ))}
          </ul>
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
    </div>
  );
};
export default Minecraft;
