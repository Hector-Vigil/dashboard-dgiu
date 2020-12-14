/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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
import SideBar from "../../components/sideBar/sideBar";
import PieChart from "../../components/charts/genericChart/pie-chart.component";

import getMajors from "./homepageUtils";

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
  sideBarAndInformationContainer: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  pieChartAndLinearChartContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "80vw",
  },
  pieChartGroupsContainer: {
    width: "48%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  pieChartCentersContainer: {
    width: "48%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cssLabel: {
    color: "#f4f4f4",
    "&.Mui-focused": {
      color: "#23A5EB",
    },
  },
  cssOutlinedInput: {
    color: "#f4f4f4",
    height: "30%",
  },
}));

const HomePage = ({ open }) => {
  const classes = useStyles();
  //State
  const [treeViewData, setTreeViewData] = useState({});
  const [majorsData, setMajorsData] = useState([]);
  const [majorsAndFacultiesData, setMajorsAndFacultiesData] = useState([]);
  const [pieChartGroupsData, setPieChartGroupsData] = useState(null);
  const [pieChartCentersData, setPieChartCentersData] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expandedChildren, setExpandedChildren] = useState(["root"]);
  //Fectching data
  useEffect(() => {
    fetchTreeViewData();
  }, []);

  useEffect(() => {
    fetchPieChartGroupsData();
  }, []);

  useEffect(() => {
    fetchPieChartCentersData();
  }, []);

  useEffect(() => {
    buildTableData();
  }, [treeViewData]);

  const buildTableData = () => {
    if (treeViewData.children) {
      const tableData = [];
      getMajors(treeViewData.children, 0, tableData);
      const sortedArray = tableData.sort((a, b) => {
        return b.matchInformation - a.matchInformation;
      });
      setMajorsData(sortedArray);
      setMajorsAndFacultiesData(sortedArray);
    }
  };

  const filterMajorHandler = (event) => {
    const majorName = event.target.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const filteredMajor = majorsData.filter(
      (major) =>
        major.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(majorName) ||
        major.faculty
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(majorName)
    );
    setMajorsAndFacultiesData(filteredMajor);
  };

  const fetchPieChartCentersData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3300/centers-information"
      );
      setPieChartCentersData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPieChartGroupsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3300/getGroupStats");
      setPieChartGroupsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  //Components Handlers

  const studentsOpenModalHandler = (routeParams) => {
    const [faculty, courseType, major, year] = routeParams;
    modalDataHandler(faculty, courseType, major, year);
    setOpenModal(true);
  };
  const studentsCloseModalHandler = () => {
    setOpenModal(false);
  };

  const expandChildHandler = (nodeId) => {
    if (expandedChildren.includes(nodeId)) {
      const nodes = expandedChildren.filter((id) => id !== nodeId);
      setExpandedChildren(nodes);
    } else {
      const nodes = [...expandedChildren, nodeId];
      setExpandedChildren(nodes);
    }
  };

  const expandMajorHandler = (nodeId, parentId) => {
    if (!expandedChildren.includes(parentId)) {
      if (expandedChildren.includes(nodeId)) {
        const nodes = expandedChildren.filter((id) => id !== nodeId);
        setExpandedChildren(nodes);
      } else {
        const nodes = [...expandedChildren, nodeId, parentId];
        setExpandedChildren(nodes);
      }
    } else {
      if (expandedChildren.includes(nodeId)) {
        const nodes = expandedChildren.filter((id) => id !== nodeId);
        setExpandedChildren(nodes);
      } else {
        const nodes = [...expandedChildren, nodeId];
        setExpandedChildren(nodes);
      }
    }
  };

  const treeViewTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <AccountTreeIcon style={{ margin: "0px 5px" }} fontSize="large" />
      <span style={{ margin: "0px 5px" }}>ORGANIZACIONES ESTUDIANTILES</span>
    </div>
  );

  const tableRankingTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListIcon style={{ margin: "0px 5px" }} fontSize="large" />
        <span style={{ margin: "0px 5px" }}>RANKING DE CARRERAS</span>
      </div>
      <div
        style={{
          display: "block",
        }}
      >
        <TextField
          id="standard-search"
          label="Buscar..."
          type="search"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
            },
          }}
          onChange={(event) => filterMajorHandler(event)}
        />
      </div>
    </div>
  );

  const pieChartGroupsTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <ListIcon style={{ margin: "0px 5px" }} fontSize="large" />
      <span style={{ margin: "0px 5px" }}>DENSIDAD POR AÑOS</span>
    </div>
  );

  const pieChartCentersTittle = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <ListIcon style={{ margin: "0px 5px" }} fontSize="large" />
      <span style={{ margin: "0px 5px" }}>DENSIDAD POR ORGANIZACIÓN</span>
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
      <Grid className={classes.sideBarAndInformationContainer} container>
        <Grid style={{ width: 200, height: 170 }}>
          {open && <SideBar open={open} />}
        </Grid>
        <InformationOverview />
      </Grid>

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
            {!loading &&
              treeViewData &&
              studentsOpenModalHandler &&
              expandedChildren && (
                <RecursiveTreeView
                  data={treeViewData}
                  studentsOpenModalHandler={studentsOpenModalHandler}
                  expanded={expandChildHandler}
                  nodes={expandedChildren}
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
            {!loading && majorsAndFacultiesData && (
              <TableRanking
                data={majorsAndFacultiesData}
                expanded={expandMajorHandler}
              />
            )}
          </CardCharts>
        </Grid>
        <Grid className={classes.pieChartAndLinearChartContainer}>
          <Grid className={classes.pieChartGroupsContainer}>
            <CardCharts title={pieChartGroupsTittle}>
              {loading && <SpinnerComponent />}
              {!loading && pieChartGroupsData && (
                <PieChart data={pieChartGroupsData} />
              )}
            </CardCharts>
          </Grid>
          <Grid className={classes.pieChartCentersContainer}>
            <CardCharts title={pieChartCentersTittle}>
              {loading && <SpinnerComponent />}
              {!loading && pieChartCentersData && (
                <PieChart data={pieChartCentersData} />
              )}
            </CardCharts>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
