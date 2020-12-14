import "./App.css";
import React, { useState } from "react";
import HomePage from "./pages/homepage/home";
import NavBar from "./components/navbar/navbar";
import "./App.styles.scss";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const sideBarHandler = () => setShowSideBar(!showSideBar);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        {sideBarHandler && <NavBar handler={sideBarHandler} />}
        <HomePage open={showSideBar} />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
