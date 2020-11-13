import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#f4f4f4',
    },
    '& label.MuiInputLabel-root': {
      color: '#f4f4f4',
    },
    '& input.MuiInputBase-input': {
      color: '#f4f4f4',
    },
  },
});
export default function FieldAutoComplete({ type, data, id, change }) {
  const classes = useStyles();
  return (
    <Autocomplete
      id={id}
      options={data}
      getOptionLabel={(option) => option}
      style={{ width: 300, marginTop: '35px' }}
      onChange={(event, newValue) => change(event, newValue)}
      renderInput={(params) => <TextField classes={classes} {...params} label={type} variant="outlined" />}
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
