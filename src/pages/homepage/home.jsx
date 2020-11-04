/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import CardCharts from '../../components/cardCharts/card-charts.component';
import { styles } from './homeStyles';
import TableRanking from '../../components/charts/tableRanking/table-ranking.component';
import Chart from '../../components/charts/genericChart/chart';
import Spinner from '../../components/spinner/spinner.component';
import SpinnerComponent from '../../components/spinner/spinner.component';
import PieChartComponent from '../../components/charts/genericChart/pie-chart.component';
import FieldAgrupationComponent from '../../components/fieldSelection/field-agrupation.component';

const useStyles = makeStyles(styles);

const HomePage = () => {
  const classes = useStyles();

  const [provinces, setProvinces] = useState(null);
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoadingProvinces(true);
    try {
      const { data } = await axios.get('http://localhost:3300/pais');
      setProvinces(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetch provinces error', error);
    } finally {
      setLoadingProvinces(false);
    }
  };

  return (
    <Grid container justify="center" direction="row" wrap="wrap" style={{ marginTop: '1.5rem' }}>
      {loadingProvinces && <SpinnerComponent />}
      {!loadingProvinces && provinces && (
        <CardCharts title="Table 1">
          <Chart data={provinces} />
        </CardCharts>
      )}
      {
        <CardCharts>
          <PieChartComponent />
          <FieldAgrupationComponent />
        </CardCharts>
      }
      {!loadingProvinces && provinces && (
        <CardCharts title="Table 5">
          <Chart data={provinces} />
        </CardCharts>
      )}
      {
        <CardCharts title="Table 2">
          <TableRanking />
        </CardCharts>
      }
    </Grid>
  );
};

export default HomePage;
