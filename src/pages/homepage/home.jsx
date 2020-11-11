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
import RegisteredPanel from '../../components/registeredPanel/registeredPanel';
import RecursiveTreeView from '../../components/treeView/treeView';

const useStyles = makeStyles(styles);

const HomePage = () => {
  const classes = useStyles();

  const [treeViewData, setTreeViewData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTreeViewData();
  }, []);

  const fetchTreeViewData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3300/getTreeStructure');
      setTreeViewData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justify="center" direction="row" wrap="wrap" style={{ marginTop: '1.5rem' }}>
      <CardCharts title="FILTRAR ESTUDIANTES VERIFICADOS">
        <RegisteredPanel />
      </CardCharts>
      <CardCharts title="ESTUDIANTES REGISTRADOS POR FACULTAD">
        {!loading && treeViewData && <RecursiveTreeView data={treeViewData} />}
      </CardCharts>

      <CardCharts title="RANKING DE FACULTADES">
        {!loading && treeViewData && <TableRanking data={treeViewData} />}
      </CardCharts>
    </Grid>
  );
};

export default HomePage;
