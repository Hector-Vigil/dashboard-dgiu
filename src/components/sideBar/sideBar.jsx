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
  drawerPaper: {
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
  listItemIcon: {
    color: "#f4f4f4",
  },
}));

export default function PermanentDrawerLeft({ open }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
      >
        <List>
          <a href="/" style={{ textDecoration: "none", color: "#f4f4f4" }}>
            <ListItem button key="Estudiantes">
              <ListItemIcon className={classes.listItemIcon}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Estudiantes" />
            </ListItem>
          </a>
          <a
            href="http://directoriounico.umcc.cu/filemanager/"
            target="_blank"
            style={{ textDecoration: "none", color: "#f4f4f4" }}
          >
            <ListItem button key="FileManager">
              <ListItemIcon className={classes.listItemIcon}>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary="FileManager" />
            </ListItem>
          </a>
          <a
            href="http://directoriounico.umcc.cu/api/"
            target="_blank"
            style={{ textDecoration: "none", color: "#f4f4f4" }}
          >
            <ListItem button key="API-REST">
              <ListItemIcon className={classes.listItemIcon}>
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
