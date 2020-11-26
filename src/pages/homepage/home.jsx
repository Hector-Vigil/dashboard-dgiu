/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import CardCharts from "../../components/cardCharts/card-charts.component";
import TableRanking from "../../components/charts/tableRanking/table-ranking.component";
import Chart from "../../components/charts/genericChart/chart";
import Spinner from "../../components/spinner/spinner.component";
import SpinnerComponent from "../../components/spinner/spinner.component";
import RegisteredPanel from "../../components/registeredPanel/registeredPanel";
import RecursiveTreeView from "../../components/treeView/treeView";
import StudentsModal from "../../components/studentsModal/studentsModal";
import InformationOverview from "../../components/informationOverview/informationOverview";
import ColorProgressBar from "../../components/progressBar/colorProgressBar.component";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "1.5rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  treeViewAndTableContainer: {
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  treeViewContainer: {
    width: "48%",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  tableContainer: {
    width: "48%",
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

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
      const { data } = await axios.get(
        "http://localhost:3300/getTreeStructure"
      );
      setTreeViewData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const modalDataHandler = async (faculty, coursetype, major, year) => {
    const { data } = await axios.get(
      `http://localhost:3300/students-match/${faculty}/${coursetype}/${major}/${year}`
    );
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

  const treeViewTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AccountTreeIcon style={{ margin: "0px 5px" }} fontSize="large" />
      <span style={{ margin: "0px 5px" }}>
        ESTUDIANTES REGISTRADOS POR FACULTAD
      </span>
    </div>
  );

  const tableRankingTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ListIcon style={{ margin: "0px 5px" }} fontSize="large" />
      <span style={{ margin: "0px 5px" }}>RANKING DE FACULTADES</span>
    </div>
  );

  return (
    <Grid
      className={classes.container}
      container
      justify="flex-end"
      direction="row"
      wrap="wrap"
    >
      <InformationOverview />
      <Grid
        className={classes.treeViewAndTableContainer}
        container
        justify="space-between"
        direction="row"
        wrap="wrap"
        style={{ width: "80vw" }}
      >
        <Grid className={classes.treeViewContainer}>
          <CardCharts title={treeViewTittle}>
            {loading && <SpinnerComponent />}
            {!loading && treeViewData && studentsOpenModalHandler && (
              <RecursiveTreeView
                data={treeViewData}
                studentsOpenModalHandler={studentsOpenModalHandler}
              />
            )}
            {!loading &&
              openModal &&
              studentsCloseModalHandler &&
              modalData && (
                <StudentsModal
                  openModal={openModal}
                  studentsCloseModalHandler={studentsCloseModalHandler}
                  data={modalData}
                />
              )}
          </CardCharts>
        </Grid>

        <Grid className={classes.tableContainer}>
          <CardCharts title={tableRankingTittle}>
            {loading && <SpinnerComponent />}
            {!loading && treeViewData && <TableRanking data={treeViewData} />}
          </CardCharts>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
