import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import GroupIcon from "@material-ui/icons/Group";
import Table from "../components/table/table.component";

import { connect } from "react-redux";

import { useQueryClient, useQuery } from "react-query";

import CardCharts from "../components/cardCharts/card-charts.component";
import SideBar from "../components/sideBar/sidebar.component";
import {
  fetchOrganizationTree,
  fetchOrganizationStatitstics,
  fetchProfessorsList,
} from "../api";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "4.5rem",
    paddingLeft: "15.5rem",
    paddingRight: "15.5rem",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  root: {
    // display: "flex",
    // flex: 2,
    paddingBottom: "0.5rem",
    // overflow: "auto",
    fontFamily: "'Poppins', sans-serif",
    width: (window.visualViewport.width * 7) / 10,
    height: window.visualViewport.height / 2,
  },
  table: {
    // display: "flex",
    // flex: 2,
    paddingBottom: "0.5rem",
    // overflow: "auto",
    fontFamily: "'Poppins', sans-serif",
    width: (window.visualViewport.width * 6) / 10,
    height: window.visualViewport.height / 2,
  },
  labelContainer: {
    height: 40,
    paddingTop: 10,
    display: "flex",
    alignContent: "start",
  },
  label: {
    border: 1,
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 4,
    margin: 10,
    marginLeft: 0,
    height: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  treeItemDark: {
    // display: "flex",
    // width: "100%",
    paddingTop: "0.5rem",
    justifyContent: "space-between",
    fontFamily: "'Poppins', sans-serif",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  treeItemLight: {
    // display: "flex",
    // width: "100%",
    color: "#3b3f51",
    paddingBottom: "0.5rem",
    justifyContent: "space-between",
    fontFamily: "'Poppins', sans-serif",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  sideBarContainer: {
    width: 200,
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: 10,
      height: 10,
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));

const StatusPage = ({ darkMode, showSideBar }) => {
  const classes = useStyles();
  const _tempKeyValue = {};
  const professorsList = [];
  const columns = [
    {
      field: "fullName",
      headerName: "Nombre",
      sortable: true,
      width: (window.visualViewport.width * 2) / 10,
      headerColor: "white",
    },
    {
      field: "dept",
      headerName: "Departamento",
      width: (window.visualViewport.width * 2) / 10,
    },
  ];
  const rowss = [
    { id: 0, fullName: "keseyo", dept: "Uno ahi" },
    { id: 1, fullName: "keseyo", dept: "Otro ahi" },
    { id: 2, fullName: "keseyo", dept: "Otro mas ahi" },
    { id: 45, fullName: "keseyo", dept: "Uno ahi" },
    { id: 15432, fullName: "keseyo", dept: "Otro ahi" },
    { id: 2763, fullName: "keseyo", dept: "Otro mas ahi" },
    { id: 7653, fullName: "keseyo", dept: "Uno ahi" },
    { id: 1764, fullName: "keseyo", dept: "Otro ahi" },
    { id: 76452, fullName: "keseyo", dept: "Otro mas ahi" },
    { id: 543245, fullName: "keseyo", dept: "Uno ahi" },
    { id: 15543432, fullName: "keseyo", dept: "Otro ahi" },
    { id: 2754363, fullName: "keseyo", dept: "Otro mas ahi" },
    { id: 75432653, fullName: "keseyo", dept: "Uno ahi" },
    { id: 17354264, fullName: "keseyo", dept: "Otro ahi" },
    { id: 76543452, fullName: "keseyo", dept: "Otro mas ahi" },
  ];

  const [selected, setSelected] = useState(["root"]);
  const [selectedIds, setSelectedIds] = useState(["root"]);
  const [tabSelected, setTabSelected] = useState("org");
  const [rows, setRows] = useState(rowss);
  const [rowsA, setRowsA] = useState(rowss);
  const [rowsB, setRowsB] = useState([]);
  const [selectedRowsA, setSelectedRowsA] = useState([]);
  const [selectedRowsB, setSelectedRowsB] = useState([]);

  const queryClient = new useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    "fetchOrganizationData",
    fetchOrganizationTree
  );

  const {
    isLoading: pLoading,
    isError: pIsError,
    error: pError,
    data: pData,
  } = useQuery("", fetchProfessorsList);

  const handleSelect = (event, nodeIds) => {
    const arrayToSend = [];
    const tempValues = Object.values(_tempKeyValue);
    const tempKeys = Object.keys(_tempKeyValue);
    nodeIds.forEach((e) => {
      if (e === "root") arrayToSend.push(e);
      else {
        const index = tempKeys.findIndex((i) => i === e);
        arrayToSend.push(tempValues[index]);
      }
    });
    setSelectedIds(nodeIds);
    setSelected(arrayToSend);
  };

  const handleSelectionChangeA = (selection) => {
    // console.log("here selection above", selection);
    setSelectedRowsA(selection);
  };

  const handleSelectionChangeB = (selection) => {
    console.log("here selection below", selection);
    setSelectedRowsB(selection);
  };

  const handleAddSelection = () => {
    if (selectedRowsA.length) {
      let toAdd = [];
      let toRemove = [...rows];
      let indexesTR = [];
      rowsB.forEach((e) => indexesTR.push(e.id));
      console.log("before indexes", indexesTR);
      console.log("selection", selectedRowsA);
      selectedRowsA.forEach((e) => indexesTR.push(e));
      indexesTR.sort();
      console.log("indexes", indexesTR);
      for (let i = 0; i < indexesTR.length; i++) {
        toRemove.splice(indexesTR[i] - i, 1);
        toAdd.push(rows[indexesTR[indexesTR.length - 1 - i]]);
      }
      setRowsA(toRemove);
      setRowsB(toAdd);
    }
  };

  const handleRemoveSelection = () => {};

  const renderTree = (nodes) => (
    <div className={darkMode ? classes.treeItemDark : classes.treeItemLight}>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id.toString()}
        label={nodes.name}
        style={{ textAlign: "start" }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  const createKeyValue = (nodes) => {
    _tempKeyValue[nodes.id] = nodes.name;

    if (Array.isArray(nodes.children)) {
      nodes.children.map((node) => {
        _tempKeyValue[node.id] = node.name;
        createKeyValue(node);
      });
    }
  };

  const getProfessorsList = (data) => {
    console.log("here", data[0]);
    let r = [];
    for (let i = 0; i < data.length; i++)
      r.push({ id: i, fullName: data[i].nombre, dept: data[i].departamento });
    if (data.length !== rowsA.length) setRows(r);
  };

  useEffect(() => {
    if (data) createKeyValue(data);
  }, [data]);

  useEffect(() => {
    if (pData) getProfessorsList(pData);
  }, [pData]);

  useEffect(() => {
    setRowsA(rows);
  }, [rows]);

  const treeViewTittle = (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          border: "white",
          borderStyle: "solid",
          borderWidth: "1px",
          flex: 1,
          background: tabSelected === "org" ? "#242e41" : "transparent",
        }}
        onClick={() => setTabSelected("org")}
      >
        <AccountTreeIcon style={{ margin: "0px 5px" }} fontSize="large" />
        <span>ORGANIZACIONES ESTUDIANTILES</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          border: "white",
          borderStyle: "solid",
          borderWidth: "1px",
          flex: 1,
          background: tabSelected === "usr" ? "#242e41" : "transparent",
        }}
        onClick={() => setTabSelected("usr")}
      >
        <GroupIcon style={{ margin: "0px 5px" }} fontSize="large" />
        <span>USUARIOS</span>
      </div>
    </div>
  );

  if (isLoading || pLoading) return <h1>Loading...</h1>;

  return (
    <Grid className={classes.container} container>
      <Grid className={classes.sideBarContainer}>
        {showSideBar && <SideBar darkMode={darkMode} />}
      </Grid>
      <Grid
        container
        justify="space-between"
        style={{
          height: (window.visualViewport.height * 11) / 10,
          // marginBottom: "10px",
          // minWidth: (window.visualViewport.width * 7) / 10,
        }}
      >
        <CardCharts title={treeViewTittle} darkMode={darkMode}>
          {tabSelected === "org" && (
            <TreeView
              className={classes.root}
              defaultExpanded={["root"]}
              multiSelect
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              selected={selectedIds}
              onNodeSelect={handleSelect}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                minWidth: (window.visualViewport.width * 7) / 10,
              }}
            >
              {renderTree(data)}
            </TreeView>
          )}
          {tabSelected === "usr" && (
            <div
              className={classes.table}
              style={{ minWidth: (window.visualViewport.width * 6) / 10 }}
            >
              {/* <div style={{ maxWidth: (window.visualViewport.width * 6) / 10 }}> */}
              <Table
                rows={rowsA}
                columns={columns}
                onSelectionChange={handleSelectionChangeA}
              />
              <div className={classes.labelContainer}>
                <label
                  className={classes.label}
                  style={selectedRowsA.length ? {} : { color: "darkgray" }}
                  onClick={handleAddSelection}
                >
                  Agregar Seleccion
                </label>
                <label
                  className={classes.label}
                  onClick={() => console.log("eliminar seleccion")}
                >
                  Eliminar Seleccion
                </label>
              </div>
              <span style={{ marginTop: 10 }}>Seleccion</span>
              <Table
                rows={rowsB}
                columns={columns}
                onSelectionChange={handleSelectionChangeB}
              />
              {/* </div> */}
            </div>
          )}
        </CardCharts>
        {/* <CardCharts title="Datos" darkMode={darkMode}>
          <OrganizationsTable selected={selected} darkMode={darkMode} />
        </CardCharts> */}
      </Grid>
      <Grid container style={{ display: "flex", width: "100%" }}>
        <CustomCard title={"Personal"} start={true} darkMode={darkMode} />
        <CustomCard title={"Categoria docente"} darkMode={darkMode} />
      </Grid>
      <Grid container style={{ display: "flex", width: "100%" }}>
        <CustomCard
          title={"Categoria cientifica"}
          start={true}
          darkMode={darkMode}
        />
        <CustomCard title={"Departamento"} darkMode={darkMode} />
      </Grid>
    </Grid>
  );
};

const CustomCard = ({ start, title, darkMode }) => {
  return (
    <div style={start ? { flex: 1, marginRight: 20 } : { flex: 1 }}>
      <CardCharts title={title} darkMode={darkMode}></CardCharts>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.homepage.darkMode,
  showSideBar: state.homepage.showSideBar,
});

export default connect(mapStateToProps)(StatusPage);

const OrganizationsTable = ({ selected, darkMode }) => {
  const classes = useStyles();
  const {
    isLoading: orgLoading,
    isError: orgIsError,
    error: orgError,
    data: orgData,
  } = useQuery(
    ["fetchOrganizationStatitstics", selected],
    fetchOrganizationStatitstics
  );

  if (orgLoading) return <h2>Loading...</h2>;
  const data = Object.keys(orgData);

  if (data.length)
    return (
      <div>
        {data.map((element, key) => {
          return (
            <span
              key={key}
              style={
                darkMode
                  ? { marginTop: 10, marginBottom: 10 }
                  : { color: "#3b3f51", marginTop: 10, marginBottom: 10 }
              }
            >{`${element} : ${orgData[element]}`}</span>
          );
        })}
      </div>
    );
  else
    return (
      <span style={darkMode ? {} : { color: "#3b3f51" }}>
        No hay informacion disponible
      </span>
    );
};
