import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FieldAutoComplete({ type, data }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField style={{ color: '#f4f4f4' }} {...params} label={type} variant="outlined" />}
    />
  );
}
