import React from 'react';
import FieldSelector from './field-selector.component';

const FieldAgrupationComponent = () => {
  return (
    <div>
      <FieldSelector type="Facultad" />
      <FieldSelector type="Tipo de Curso" />
      <FieldSelector type="Carrera" />
      <FieldSelector type="Año de Estudio" />
    </div>
  );
};
export default FieldAgrupationComponent;
