import React from 'react';
import FieldSelector from './field-selector.component';

const FieldAgrupationComponent = ({
  filters: {
    data: { faculties, courseTypes, majors, years },
  },
}) => {
  return faculties && courseTypes && majors && years ? (
    <div>
      <FieldSelector type="Facultad" data={faculties} />
      <FieldSelector type="Tipo de Curso" data={courseTypes} />
      <FieldSelector type="Carrera" data={majors} />
      <FieldSelector type="Año de Estudio" data={years} />
    </div>
  ) : null;
};
export default FieldAgrupationComponent;
