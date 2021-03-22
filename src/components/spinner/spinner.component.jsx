import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import "./spinner.styles.scss";

const styledSpinner = makeStyles((theme) => ({
  colorSecondary: {
    color: "#ea2c62",
  },
}));

const SpinnerComponent = () => {
  const classes = styledSpinner();
  return (
    <CircularProgress
      className="spinner"
      classes={{ colorSecondary: classes.colorSecondary }}
      color="secondary"
      size="200px"
    />
  );
};

export default SpinnerComponent;
