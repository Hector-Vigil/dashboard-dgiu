import React from "react";
import { CircularProgress, makeStyles, withStyles } from "@material-ui/core";
import "./spinner.styles.scss";

// const styledSpinner = makeStyles ({
//     colorPrimary: {
//         color: red,
//     }
// })

const SpinnerComponent = ({ value }) => {
  return (
    <CircularProgress className="spinner" color="secondary" size="200px" />
  );
};

export default SpinnerComponent;
