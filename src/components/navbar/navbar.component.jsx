import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";

import { connect } from "react-redux";

import { toggleSidebar, toggleDarkMode } from "../../actions/homepage";

import "./navbar.styles.scss";
import NavBarLogo from "../navbar-logo/navbar-logo.component";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  modeIconContainer: {
    display: "flex",
    justifyContent: "center",
  },

  modePrintIconContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const NavBar = ({
  darkMode,
  handlePrintMode,
  showSideBar,
  toggleSidebar,
  toggleDarkMode,
}) => {
  const classes = useStyles();

  return (
    <div className="navBar">
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{ backgroundColor: "#1f1f2f", boxShadow: "none" }}
        >
          <hr />
          <Toolbar className={classes.root}>
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
                  <p style={{fontSize:24, fontWeight: 700}}>DIRECTORIO UNICO</p>
                </div>
              </Typography>
              <span />
              <div className={classes.iconsContainer}>
                <IconButton
                  className={classes.modePrintIconContainer}
                  style={{ color: "#f4f4f4" }}
                  // onClick={() => handlePrintMode()}
                >
                  <PrintOutlinedIcon />
                </IconButton>

                {/* <IconButton
                  className={classes.modeIconContainer}
                  style={{ color: "#f4f4f4" }}
                  onClick={() => toggleDarkMode(!darkMode)}
                >
                  {darkMode && (
                    <Brightness7RoundedIcon
                      className={classes.modeIconContainer}
                    />
                  )}
                  {!darkMode && (
                    <Brightness4RoundedIcon
                      className={classes.modeIconContainer}
                    />
                  )}
                </IconButton> */}

                <IconButton
                  style={{ color: "#f4f4f4" }}
                  aria-label="open drawer"
                  onClick={() => toggleSidebar(!showSideBar)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showSideBar: state.homepage.showSideBar,
  darkMode: state.homepage.darkMode,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: (showSideBar) => dispatch(toggleSidebar(showSideBar)),
  toggleDarkMode: (darkMode) => dispatch(toggleDarkMode(darkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
