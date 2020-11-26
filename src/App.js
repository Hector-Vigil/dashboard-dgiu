import "./App.css";
import React from "react";
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
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <HomePage />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
