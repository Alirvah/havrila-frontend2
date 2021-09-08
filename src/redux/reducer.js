const initialState = {
  token: "",
  user: "",
  groups: [],
  active_note: 0,
  active_notebook: 0,
  notes: [],
  notebooks: [],
  quill: "",
  route: "/",
  refresh: true,
  numberOfTodos: 0,
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const reduxState = (state = loadState(), action) => {
  switch (action.type) {
    case "SAVETOKEN":
      saveState({ ...state, token: action.payload });
      return { ...state, token: action.payload };
    case "SAVEUSER":
      saveState({ ...state, user: action.payload });
      return { ...state, user: action.payload };
    case "ACTIVE_NOTEBOOK":
      return { ...state, active_notebook: action.payload };
    case "ACTIVE_NOTE":
      return { ...state, active_note: action.payload };
    case "SET_NOTEBOOKS":
      return { ...state, notebooks: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "SET_QUILL":
      return { ...state, quill: action.payload };
    case "SET_ROUTE":
      return { ...state, route: action.payload };
    case "SET_REFRESH":
      return { ...state, refresh: !state.refresh };
    case "LOGOUT":
      return initialState;
    case "SET_NUMBER_OF_TODOS":
      return { ...state, numberOfTodos: action.payload };
    case "SET_USER_GROUPS":
      return { ...state, groups: action.payload };
    default:
      return state;
  }
};

export default reduxState;
