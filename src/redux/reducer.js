const initialState = {
  token: "",
  user: "",
  active_note: 0,
  active_notebook: 0,
  notes: [],
  notebooks: [],
  quill: "",
  route: "/",
  refresh: true,
};

const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem("state");
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
    window.localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export default (state = loadState(), action) => {
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
      console.log(state.refresh);
      return { ...state, refresh: !state.refresh };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
