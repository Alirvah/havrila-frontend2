import "./maincss.css";

import { API, SYSTEM_URL, TODO_URL } from "../config/constants";
import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotesIcon from "@material-ui/icons/Notes";
import Router from "./Router";
import TapAndPlayIcon from "@material-ui/icons/TapAndPlay";
import TimelineIcon from "@material-ui/icons/Timeline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { SportsEsports } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.numberOfTodos);
  const user = useSelector((store) => store.user) || "";
  const groups = useSelector((store) => store.groups) || "";

  useEffect(() => {
    axios.get(TODO_URL + API.TODO).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_NUMBER_OF_TODOS", payload: r.data.length });
      }
    });
    axios.get(SYSTEM_URL + API.GET_GROUPS).then((r) => {
      if (r.data) {
        dispatch({ type: "SET_USER_GROUPS", payload: r.data.groups });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {groups.includes("admin") &&
          [
            "Notes",
            "Todo",
            "Filer",
            "Sensors",
            "Devices",
            "Admin",
            "Canvas",
          ].map((text, index) => (
            <ListItem
              component={Link}
              to={`/${text.toLowerCase()}`}
              button
              key={text}
            >
              <ListItemIcon>
                {index === 0 && <NotesIcon />}
                {index === 1 && (
                  <Badge color="secondary" badgeContent={todos}>
                    <MailIcon />
                  </Badge>
                )}
                {index === 2 && <FolderOpenIcon />}
                {index === 3 && <TimelineIcon />}
                {index === 4 && <TapAndPlayIcon />}
                {index === 5 && <TapAndPlayIcon />}
                {index === 6 && <SportsEsports />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {groups.includes("minecraft") &&
          ["Minecraft"].map((text, index) => (
            <ListItem
              component={Link}
              to={`/${text.toLowerCase()}`}
              button
              key={text}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
      <List>
        {groups.includes("valheim") &&
          ["Valheim"].map((text, index) => (
            <ListItem
              component={Link}
              to={`/${text.toLowerCase()}`}
              button
              key={text}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            style={{ color: "white" }}
            component={Link}
            to="/"
            variant="h6"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Typography>{user}</Typography>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <Button onClick={logout} color="inherit">
              <ExitToAppIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Router />
      </main>
    </div>
  );
}
export default ResponsiveDrawer;
