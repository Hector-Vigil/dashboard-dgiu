
import React from 'react';
import { CircularProgress, makeStyles, withStyles } from '@material-ui/core';
import './spinner.styles.scss'

// const styledSpinner = makeStyles ({
//     colorPrimary: {
//         color: red,
//     }
// })

const SpinnerComponent = () => {
    return (
        <CircularProgress className='spinner' color= 'secondary' size='10rem'/>
    );
};

export default SpinnerComponent;