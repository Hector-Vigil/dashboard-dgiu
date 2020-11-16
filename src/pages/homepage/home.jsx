/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import CardCharts from '../../components/cardCharts/card-charts.component';
import { styles } from './homeStyles';
import TableRanking from '../../components/charts/tableRanking/table-ranking.component';
import SpinnerComponent from '../../components/spinner/spinner.component';
import RegisteredPanel from '../../components/registeredPanel/registeredPanel';
import RecursiveTreeView from '../../components/treeView/treeView';
import StudentsModal from '../../components/studentsModal/studentsModal';

const useStyles = makeStyles(styles);

const HomePage = () => {
  const classes = useStyles();

  const [treeViewData, setTreeViewData] = useState({});
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const modalDataHandler = async (faculty, coursetype, major, year) => {
    const { data } = await axios.get(`http://localhost:3300/students-match/${faculty}/${coursetype}/${major}/${year}`);
    setModalData(data);
  };

  const studentsOpenModalHandler = (routeParams) => {
    const [faculty, courseType, major, year] = routeParams;
    modalDataHandler(faculty, courseType, major, year);
    setOpenModal(true);
  };
  const studentsCloseModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <Grid container justify="center" direction="row" wrap="wrap" style={{ marginTop: '1.5rem', width: '100%' }}>
      <CardCharts title="FILTRAR ESTUDIANTES VERIFICADOS">
        <RegisteredPanel />
      </CardCharts>
      <CardCharts title="ESTUDIANTES REGISTRADOS POR FACULTAD">
        {loading && <SpinnerComponent />}
        {!loading && treeViewData && studentsOpenModalHandler && (
          <RecursiveTreeView data={treeViewData} studentsOpenModalHandler={studentsOpenModalHandler} />
        )}
        {!loading && openModal && studentsCloseModalHandler && modalData && (
          <StudentsModal openModal={openModal} studentsCloseModalHandler={studentsCloseModalHandler} data={modalData} />
        )}
      </CardCharts>

      <CardCharts title="RANKING DE FACULTADES">
        {loading && <SpinnerComponent />}
        {!loading && treeViewData && <TableRanking data={treeViewData} />}
      </CardCharts>
    </Grid>
  );
};

export default HomePage;
