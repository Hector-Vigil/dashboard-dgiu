import React from 'react';
import FieldAutoComplete from './fieldAutoComplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '40%',
    minWidth: 250,
    marginRight: '30px',
  },
});

const FieldAgrupationComponent = ({
  filters: {
    data: { faculties, courseTypes, majors, years },
  },
  change,
}) => {
  const classes = useStyles();
  return faculties && courseTypes && majors && years ? (
    <div className={classes.container}>
      <FieldAutoComplete id="Facultad" type="Facultad" data={faculties} change={change} />
      <FieldAutoComplete id="Tipo de Curso" type="Tipo de Curso" data={courseTypes} change={change} />
      <FieldAutoComplete id="Carrera" type="Carrera" data={majors} change={change} />
      <FieldAutoComplete id="Año de Estudio" type="Año de Estudio" data={years} change={change} />
    </div>
  ) : null;
};
export default FieldAgrupationComponent;
