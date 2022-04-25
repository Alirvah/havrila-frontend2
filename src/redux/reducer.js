const initialState = {
  token: "",
  user: "",
  groups: [],
  note: {
    active_note: 0,
    active_notebook: 0,
    show_notes: false,
    show_notebooks: false,
    show_quill: false,
    notes: [],
    notebooks: [],
    quill: "",
    loaded: true,
  },
  route: "/",
  refresh: true,
  numberOfTodos: 0,
  navbar: true,
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
    case "LOADED":
      return {
        ...state,
        note: {
          ...state.note,
          loaded: action.payload,
        },
      };
    case "SHOW_QUILL":
      return {
        ...state,
        note: {
          ...state.note,
          show_quill: action.payload,
        },
      };
    case "SHOW_NOTES":
      return {
        ...state,
        note: {
          ...state.note,
          show_notes: action.payload,
        },
      };
    case "SHOW_NOTEBOOKS":
      return {
        ...state,
        note: {
          ...state.note,
          show_notebooks: action.payload,
        },
      };
    case "ACTIVE_NOTEBOOK":
      //const note = { ...state.note, active_notebook: action.payload };
      return {
        ...state,
        note: {
          ...state.note,
          active_notebook: action.payload,
        },
      };
    case "ACTIVE_NOTE":
      return {
        ...state,
        note: {
          ...state.note,
          active_note: action.payload,
        },
      };
    case "SET_NOTEBOOKS":
      //const note = { ...state.note, active_notebook: action.payload };
      return {
        ...state,
        note: {
          ...state.note,
          notebooks: action.payload,
        },
      };
    case "SET_NOTES":
      return {
        ...state,
        note: {
          ...state.note,
          notes: action.payload,
        },
      };
    case "SET_QUILL":
      return {
        ...state,
        note: {
          ...state.note,
          quill: action.payload,
        },
      };
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
    case "NAVBAR":
      return { ...state, navbar: action.payload };
    default:
      return state;
  }
};

export default reduxState;
