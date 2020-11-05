import React from 'react';
import FieldAutoComplete from './fieldAutoComplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const FieldAgrupationComponent = ({
  filters: {
    data: { faculties, courseTypes, majors, years },
  },
}) => {
  const classes = useStyles();
  return faculties && courseTypes && majors && years ? (
    <div className={classes.container}>
      <FieldAutoComplete type="Facultad" data={faculties} />
      <FieldAutoComplete type="Tipo de Curso" data={courseTypes} />
      <FieldAutoComplete type="Carrera" data={majors} />
      <FieldAutoComplete type="Año de Estudio" data={years} />
    </div>
  ) : null;
};
export default FieldAgrupationComponent;
