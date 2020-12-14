import "./App.css";
import React, { useState } from "react";
import HomePage from "./pages/homepage/home";
import NavBar from "./components/navbar/navbar";
import "./App.styles.scss";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#056676",
    },
    secondary: {
      main: "#cf1b1b",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: "#e9ecf3",
    backgroundColor: "#ccc",
    color: "#3b3f51",
  },
}));

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  const handlerMode = () => setDarkMode(!darkMode);

  const sideBarHandler = () => setShowSideBar(!showSideBar);

  const classes = useStyles();

  return (
    <div className={darkMode ? "App" : classes.root}>
      <MuiThemeProvider theme={theme}>
        {sideBarHandler && (
          <NavBar
            darkMode={darkMode}
            handlerMode={handlerMode}
            handler={sideBarHandler}
          />
        )}
        <HomePage darkMode={darkMode} open={showSideBar} />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
