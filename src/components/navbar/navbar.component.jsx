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

import "./navbar.styles.scss";
import NavBarLogo from "../navbar-logo/navbar-logo.component";

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
	modePrintIconContainer: {
		position: "absolute",
		top: "0.5rem",
		right: "8rem",
		display: "flex",
		justifyContent: "center",
	},
}));

const NavBar = ({ handler, handleDarkMode, darkMode, handlePrintMode }) => {
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
								className={classes.modePrintIconContainer}
								style={{ color: "#f4f4f4" }}
								onClick={() => handlePrintMode()}
							>
								<PrintOutlinedIcon />
							</IconButton>

							<IconButton
								className={classes.modeIconContainer}
								style={{ color: "#f4f4f4" }}
								onClick={() => handleDarkMode()}
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
