import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FieldAgrupation from '../../components/fieldSelection/field-agrupation.component';
import PieChart from '../../components/charts/genericChart/pie-chart.component';

import { makeStyles } from '@material-ui/core/styles';
import { FilterSharp } from '@material-ui/icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

const RegisteredPanel = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    fetchPieChartFilters();
  }, []);

  const fetchPieChartFilters = async () => {
    setLoading(true);
    try {
      const filters = await axios.get('http://localhost:3300/pie-chart-information');
      setFilters(filters);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <PieChart />
      {!loading && filters && <FieldAgrupation filters={filters} />}
    </div>
  );
};

export default RegisteredPanel;
