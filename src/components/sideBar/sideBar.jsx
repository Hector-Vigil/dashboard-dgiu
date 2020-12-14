import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SchoolIcon from "@material-ui/icons/School";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 160,
  },
  drawer: {
    display: "flex",
    height: "100%",
    width: 200,
    flexShrink: 0,
  },
  drawerPaperDark: {
    display: "flex",
    width: 200,
    height: 170,
    marginTop: 74,
    marginRight: 20,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 54,
      marginLeft: 0,
      width: "100%",
      alignContent: "center",
    },
    backgroundColor: " #27293d",
    color: "#f4f4f4",
  },
  drawerPaperLight: {
    display: "flex",
    width: 200,
    height: 170,
    marginTop: 74,
    marginRight: 20,
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 54,
      marginLeft: 0,
      width: "100%",
      alignContent: "center",
    },
    backgroundColor: "#fff",
    color: "#3b3f51",
  },
  listItemIconDark: {
    color: "#f4f4f4",
  },
  listItemIconLight: {
    color: "#3b3f51",
  },
}));

<<<<<<< HEAD
export default function PermanentDrawerLeft({ open }) {
=======
export default function PermanentDrawerLeft({ open, darkMode }) {
>>>>>>> 1f17a6f3ab79ecc96a0b0371a5c7cff67dff5639
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={
          darkMode
            ? {
                paper: classes.drawerPaperDark,
              }
            : { paper: classes.drawerPaperLight }
        }
        anchor="left"
        open={open}
      >
        <List>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: darkMode ? "#f4f4f4" : "#3b3f51",
            }}
          >
            <ListItem button key="Estudiantes">
              <ListItemIcon
                className={
                  darkMode
                    ? classes.listItemIconDark
                    : classes.listItemIconLight
                }
              >
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Estudiantes" />
            </ListItem>
          </a>
          <a
            href="http://directoriounico.umcc.cu/filemanager/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: darkMode ? "#f4f4f4" : "#3b3f51",
            }}
          >
            <ListItem button key="FileManager">
              <ListItemIcon
                className={
                  darkMode
                    ? classes.listItemIconDark
                    : classes.listItemIconLight
                }
              >
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary="FileManager" />
            </ListItem>
          </a>
          <a
            href="http://directoriounico.umcc.cu/api/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: darkMode ? "#f4f4f4" : "#3b3f51",
            }}
          >
            <ListItem button key="API-REST">
              <ListItemIcon
                className={
                  darkMode
                    ? classes.listItemIconDark
                    : classes.listItemIconLight
                }
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="API-REST" />
            </ListItem>
          </a>
        </List>
      </Drawer>
    </div>
  );
}
