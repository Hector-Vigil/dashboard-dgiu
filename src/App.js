import "./App.css";
import React, { useState, useRef } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import StatusPage from "./pages/statuspage.component";
import NavBar from "./components/navbar/navbar.component";
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

// const useStyles = makeStyles(() => ({
// 	root: {
// 		// backgroundColor: "#e9ecf3",
// 		backgroundColor: "#ccc",
// 		color: "#3b3f51",
// 	},
// }));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      printMode: false,
    };
  }

  componentDidUpdate() {
    if (this.state.printMode == true) {
      if (this.state.showSideBar == true) {
        this.setState((prevState, prevProps) => ({
          showSideBar: !prevState.showSideBar,
        }));
      } else {
        window.print();
        this.setState((prevState, prevProps) => ({
          printMode: !prevState.printMode,
          darkMode: !prevState.darkMode,
        }));
      }
    }
  }

  render() {
    const { printMode } = this.state;
    // const [showSideBar, setShowSideBar] = useState(false);

    // const [darkMode, setDarkMode] = useState(true);

    // const [printMode, setPrintMode] = useState(false);

    // const handleDarkMode = () => setDarkMode(!darkMode);

    // const handlePrintMode = () => setPrintMode(!printMode);

    // const sideBarHandler = () => setShowSideBar(!showSideBar);

    const handlePrintMode = () =>
      this.setState((prevState, prevProps) => ({
        printMode: !prevState.printMode,
        darkMode:
          prevState.darkMode == true ? !prevState.darkMode : prevState.darkMode,
      }));

    // const classes = useStyles();
    // const classes = makeStyles(() => ({
    // 	root: {
    // 		// backgroundColor: "#e9ecf3",
    // 		backgroundColor: "#ccc",
    // 		color: "#3b3f51",
    // 	},
    // }));

    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.darkMode ? "App" : "AppLight"}>
          {printMode == true ? false : true && <NavBar />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/status" component={StatusPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.homepage.darkMode,
});

export default connect(mapStateToProps)(App);
