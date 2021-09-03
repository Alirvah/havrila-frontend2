import { API, TODO_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Todo() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    axios.get(TODO_URL + API.TODO).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NUMBER_OF_TODOS", payload: r.data.length });
        setTodos(r.data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line
  }, [refresh]);

  const handleToggle = (id, done) => () => {
    axios
      .patch(TODO_URL + API.TODO + id + "/", {
        done: !done,
      })
      .then((r) => {
        if (r.data) {
          setRefresh(!refresh);
        }
      });
  };

  const handleInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const enterSubmit = (e) => {
    if (e.keyCode === 13) {
      saveTodo();
    }
  };

  const handleDelete = (id) => () => {
    axios.delete(TODO_URL + API.TODO + id + "/").then((r) => {
      setRefresh(!refresh);
    });
  };

  const saveTodo = () => {
    axios
      .post(TODO_URL + API.TODO, { title: currentTodo, done: false })
      .then((r) => {
        if (r.data) {
          setCurrentTodo("");
          setRefresh(!refresh);
        }
      });
  };

  return (
    <>
      <TextField
        variant="standard"
        placeholder="Todo..."
        margin="normal"
        required
        onChange={handleInputChange}
        onKeyDown={enterSubmit}
        value={currentTodo}
      />
      {/* <Button onClick={saveTodo} color="primary">
        Save
      </Button> */}
      {loading ? (
        <>loading...</>
      ) : (
        <List className={classes.root}>
          {todos.map((e) => {
            const labelId = `checkbox-list-label-${e.id}`;

            return (
              <ListItem
                key={e.id}
                role={undefined}
                dense
                button
                onClick={handleToggle(e.id, e.done)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={e.done}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${e.title}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={handleDelete(e.id)}
                    edge="end"
                    aria-label="comments"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
