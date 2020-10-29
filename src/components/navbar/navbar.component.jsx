import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavBarLogo from "../navbar-logo/navbar-logo.component";
import "./navbar.styles.scss"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "start",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className="navBar">
      <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
           <div className="navBarContainer">
             <span><NavBarLogo/></span>
             <p>DASHBOARD</p>  
           </div> 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    </div>
    
  );
};

export default NavBar;
