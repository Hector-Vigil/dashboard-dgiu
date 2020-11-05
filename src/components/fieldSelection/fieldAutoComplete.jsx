import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import './field.styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#f4f4f4',
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: 'orange',
    // },
    '& label.MuiInputLabel-root': {
      color: '#f4f4f4',
    },
  },
}));
export default function FieldAutoComplete({ type, data }) {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField color="primary" classes={classes} {...params} label={type} variant="outlined" />
      )}
    />
  );
}
// renderInput={(params) => (
//   <div ref={params.InputProps.ref}>
//     <input style={{ width: 200 }} type="text" {...params.inputProps} />
//   </div>
{
  /*  */
}
