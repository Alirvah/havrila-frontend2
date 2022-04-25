import { API, TODO_URL } from "../../config/constants";
import React, { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

import { useDispatch } from "react-redux";

export default function Todo() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

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
    <div style={{ margin: "1rem" }}>
      <input
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
        <List>
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
                    style={{ color: "white" }}
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
                    <DeleteIcon style={{ color: "white" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}
