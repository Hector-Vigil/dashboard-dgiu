/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, makeStyles, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ListIcon from "@material-ui/icons/List";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
// import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
// import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
// import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";

import { connect } from "react-redux";
import CardCharts from "../../components/cardCharts/card-charts.component";
import TableRanking from "../../components/charts/tableRanking/table-ranking.component";
import TableRankingPrintMode from "../../components/charts/tableRanking/table-ranking-print-mode.component";
// import Chart from "../../components/charts/genericChart/chart";
// import Spinner from "../../components/spinner/spinner.component";
import SpinnerComponent from "../../components/spinner/spinner.component";
// import RegisteredPanel from "../../components/registeredPanel/registeredPanel";
import RecursiveTreeView from "../../components/treeView/treeview.component";
import StudentsModal from "../../components/studentsModal/students-modal.component";
import InformationOverview from "../../components/informationOverview/information-overview.component";
import SideBar from "../../components/sideBar/sidebar.component";
import PieChart from "../../components/charts/genericChart/pie-chart.component";

import getMajors from "./homepageUtils";

/// ///////////////////////////////////////////////////////////////////////////////////////////
/// ///////////////////// ESTILOS /////////////////////////////////////////////////////////////

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
  pieChartAndLinearChartContainerPrintMode: {
    marginTop: "12rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    // padding,
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
  pieChartCentersContainerPrintMode: {
    width: "48%",
    // marginTop: "22rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cssLabelDark: {
    color: "#f4f4f4",
    "&.Mui-focused": {
      color: "#23A5EB",
    },
  },
  cssLabelLight: {
    color: "#3b3f51",
    "&.Mui-focused": {
      color: "#23A5EB",
    },
  },
  cssOutlinedInputLight: {
    color: "#3b3f51",
    height: "30%",
  },
  cssOutlinedInputDark: {
    color: "#f4f4f4",
    height: "30%",
  },
}));

/// ///////////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////HOMEPAGE/////////////////////////////////////////////
/// //////////////////////////////////////////////////////////////////////////////////

const HomePage = ({ showSideBar, darkMode, print }) => {
  const classes = useStyles();

  /// ////////////////////STATE///////////////////////////////////////
  const [treeViewData, setTreeViewData] = useState({});
  const [majorsData, setMajorsData] = useState([]);
  const [majorsAndFacultiesData, setMajorsAndFacultiesData] = useState([]);
  const [pieChartGroupsData, setPieChartGroupsData] = useState(null);
  const [pieChartCentersData, setPieChartCentersData] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expandedChildren, setExpandedChildren] = useState(["root"]);
  const [selectedOrganization, setSelectedOrganization] = useState("Fac");

  /// /////////////////FETCHING DATA///////////////////////////////////

  
  const filterTreeViewHandler = (event) => {
    const selected = event.target.value;
    console.log(selected);
    setSelectedOrganization(selected);
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

  const modalDataHandler = async (faculty, coursetype, major, year) => {
    const { data } = await axios.get(
      `http://localhost:3300/students-match/${faculty}/${coursetype}/${major}/${year}`
    );
    setModalData(data);
  };

  // Components Handlers

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
    } else if (expandedChildren.includes(nodeId)) {
      const nodes = expandedChildren.filter((id) => id !== nodeId);
      setExpandedChildren(nodes);
    } else {
      const nodes = [...expandedChildren, nodeId];
      setExpandedChildren(nodes);
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
      <span>ORGANIZACIONES ESTUDIANTILES</span>
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
          InputLabelProps={
            darkMode
              ? {
                  classes: {
                    root: classes.cssLabelDark,
                  },
                }
              : {
                  classes: {
                    root: classes.cssLabelLight,
                  },
                }
          }
          InputProps={
            darkMode
              ? {
                  classes: {
                    root: classes.cssOutlinedInputDark,
                  },
                }
              : {
                  classes: {
                    root: classes.cssOutlinedInputLight,
                  },
                }
          }
          onChange={(event) => filterMajorHandler(event)}
        />
      </div>
    </div>
  );

  const tableRankingTittlePrintMode = (
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
      <Grid
        className={classes.sideBarAndInformationContainer}
        container
        justify={print == true ? "flex-start" : "flex-end"}
      >
        <Grid
          style={
            print == false ? { width: 200, height: 170 } : { display: "none" }
          }
        >
          {showSideBar && <SideBar darkMode={darkMode} />}
        </Grid>
        <InformationOverview darkMode={darkMode} print={print} />
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
          <CardCharts title={treeViewTittle} darkMode={darkMode}>
            <RecursiveTreeView
              darkMode={darkMode}
              printMode={print}
              studentsOpenModalHandler={studentsOpenModalHandler}
              // print={print}
              expanded={expandChildHandler}
              nodes={expandedChildren}
            />
            {!loading &&
              openModal &&
              studentsCloseModalHandler &&
              modalData && (
                <StudentsModal
                  darkMode={darkMode}
                  openModal={openModal}
                  studentsCloseModalHandler={studentsCloseModalHandler}
                  data={modalData}
                  nodeRoutes={treeViewData}
                  nodeParams={expandedChildren}
                />
              )}
          </CardCharts>
        </Grid>

        <Grid className={classes.tableContainer}>
          {print == false ? (
            <CardCharts title={tableRankingTittle} darkMode={darkMode}>
              <TableRanking darkMode={darkMode} expanded={expandMajorHandler} />
            </CardCharts>
          ) : (
            <CardCharts title={tableRankingTittlePrintMode} darkMode={darkMode}>
              <TableRankingPrintMode data={majorsAndFacultiesData} />
            </CardCharts>
          )}
        </Grid>

        <Grid
          className={
            print == false
              ? classes.pieChartAndLinearChartContainer
              : classes.pieChartAndLinearChartContainerPrintMode
          }
        >
          <Grid className={classes.pieChartGroupsContainer}>
            <CardCharts title={pieChartGroupsTittle} darkMode={darkMode}>
                <PieChart darkMode={darkMode} type="groups"/>
            </CardCharts>
          </Grid>
          <Grid
            className={
              print == false
                ? classes.pieChartCentersContainer
                : classes.pieChartCentersContainerPrintMode
            }
          >
            <CardCharts title={pieChartCentersTittle} darkMode={darkMode}>
                <PieChart darkMode={darkMode} type="centers" />
            </CardCharts>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  showSideBar: state.homepage.showSideBar,
});

export default connect(mapStateToProps)(HomePage);
