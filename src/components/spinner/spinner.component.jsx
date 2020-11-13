import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './spinner.styles.scss';

// const styledSpinner = makeStyles ({
//     colorPrimary: {
//         color: red,
//     }
// })

const SpinnerComponent = () => {
  return <CircularProgress className="spinner" color="secondary" size="200px" />;
};

export default SpinnerComponent;
