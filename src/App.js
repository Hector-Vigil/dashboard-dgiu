import "./App.css";
import React, { useState, useRef } from "react";
import HomePage from "./pages/homepage/homepage.component";
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
			showSideBar: false,
			darkMode: true,
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
		const { darkMode, showSideBar, printMode } = this.state;
		// const [showSideBar, setShowSideBar] = useState(false);

		// const [darkMode, setDarkMode] = useState(true);

		// const [printMode, setPrintMode] = useState(false);

		// const handleDarkMode = () => setDarkMode(!darkMode);

		// const handlePrintMode = () => setPrintMode(!printMode);

		// const sideBarHandler = () => setShowSideBar(!showSideBar);

		const handleDarkMode = () =>
			this.setState((prevState, prevProps) => ({
				darkMode: !prevState.darkMode,
			}));

		const handlePrintMode = () =>
			this.setState((prevState, prevProps) => ({
				printMode: !prevState.printMode,
				darkMode:
					prevState.darkMode == true
						? !prevState.darkMode
						: prevState.darkMode,
			}));

		const sideBarHandler = () =>
			this.setState((prevState, prevProps) => ({
				showSideBar: !prevState.showSideBar,
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
			<div className={darkMode ? "App" : "AppLight"}>
				<MuiThemeProvider theme={theme}>
					{sideBarHandler && printMode == true
						? false
						: true && (
								<NavBar
									darkMode={darkMode}
									handleDarkMode={handleDarkMode}
									handler={sideBarHandler}
									handlePrintMode={handlePrintMode}
								/>
						  )}
					<HomePage
						darkMode={darkMode}
						print={printMode}
						open={showSideBar}
					/>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;
