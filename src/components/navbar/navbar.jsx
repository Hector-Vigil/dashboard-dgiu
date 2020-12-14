import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavBarLogo from "../navbar-logo/navbar-logo.component";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";

import "./navbar.styles.scss";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "start",
  },
  modeIconContainer: {
    position: "absolute",
    top: "0.5rem",
    right: "5rem",
    display: "flex",
    justifyContent: "center",
  },
}));

const NavBar = ({ handler, handlerMode, darkMode }) => {
  const classes = useStyles();

  return (
    <div className="navBar">
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{ backgroundColor: "#1f1f2f", boxShadow: "none" }}
        >
          <hr />
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" className={classes.title}>
                <div className="navBarContainer">
                  <span>
                    <NavBarLogo />
                  </span>
                  <p>DASHBOARD</p>
                </div>
              </Typography>

              <IconButton
                className={classes.modeIconContainer}
                style={{ color: "#f4f4f4" }}
                onClick={() => handlerMode()}
              >
                {darkMode && <Brightness7RoundedIcon />}
                {!darkMode && <Brightness4RoundedIcon />}
              </IconButton>

              <IconButton
                style={{ color: "#f4f4f4" }}
                aria-label="open drawer"
                onClick={() => handler()}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default NavBar;
