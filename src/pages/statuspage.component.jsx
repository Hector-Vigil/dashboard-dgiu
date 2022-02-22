import React, { createRef, useState, useEffect } from "react";
import { Grid, Input, makeStyles } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import TableChartIcon from "@material-ui/icons/TableChart";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import GroupIcon from "@material-ui/icons/Group";
import Table from "../components/table/table.component";
import PieChart from "../components/charts/genericChart/pie-chart.component";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { exportCSVFile } from "../components/exportCSV/exportCSV";

import { connect } from "react-redux";

import { useQueryClient, useQuery } from "react-query";

import CardCharts from "../components/cardCharts/card-charts.component";
import SideBar from "../components/sideBar/sidebar.component";
import {
  fetchOrganizationTree,
  fetchOrganizationStatitstics,
  fetchProfessorsList,
  fetchUsersSelectionStatitstics,
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
    height: (8 * window.visualViewport.height) / 10,
  },
  labelContainer: {
    height: 40,
    paddingTop: 10,
    display: "flex",
    alignContent: "start",
  },
  exportButtons: {
    display: "flex",
    flex: 1,
    justifyContent: "end",
    marginTop: "20px",
    marginBottom: "-50px",
    marginRight: "10px",
  },
  headerSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "white",
    borderStyle: "solid",
    borderWidth: "1px",
    flex: 1,
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
const _tempKeyValue = {};

const StatusPage = ({ darkMode, showSideBar }) => {
  const classes = useStyles();

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

  const [selected, setSelected] = useState(["root"]);
  const [selectedIds, setSelectedIds] = useState(["root"]);
  const [tabSelected, setTabSelected] = useState("org");
  const [rows, setRows] = useState([]);
  const [rowsA, setRowsA] = useState([]);
  const [rowsB, setRowsB] = useState([]);
  const [selectedRowsA, setSelectedRowsA] = useState([]);
  const [selectedRowsB, setSelectedRowsB] = useState([]);
  const [searchText, setSearchText] = useState("");

  const queryClient = new useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    "fetchOrganizationData",
    fetchOrganizationTree
  );

  const searchStyle = (width, nonWhite) => {
    return {
      height: "2rem",
      width: `${width}rem`,
      border: "white 1px solid",
      borderRadius: 5,
      margin: "0.5rem",
      marginLeft: 0,
      padding: "0.2rem 1rem",
      color: nonWhite ? "black" : "white",
    };
  };

  const {
    isLoading: orgLoading,
    isError: orgIsError,
    error: orgError,
    data: orgData,
  } = useQuery(
    ["fetchOrganizationStatitstics", selected],
    fetchOrganizationStatitstics
  );

  const {
    isLoading: pLoading,
    isError: pIsError,
    error: pError,
    data: pData,
  } = useQuery("", fetchProfessorsList);

  const isOnTableB = (id) => {
    for (let i = 0; i < rowsB.length; i++) {
      if (rowsB[i].id === id) return true;
    }
    return false;
  };

  const isSelectedA = (id) => {
    for (let i = 0; i < selectedRowsA.length; i++) {
      if (selectedRowsA[i] === id) return true;
    }
    return false;
  };

  const handleSearch = (isA) => {
    let searchResult = [];
    let searchLC = searchText.toLowerCase();
    rows.forEach((e) => {
      if (
        (e.fullName.toLowerCase().indexOf(searchLC) >= 0 ||
          searchText.length === 0) &&
        !isOnTableB(e.id) &&
        (isA ? !isSelectedA(e.id) : true)
      ) {
        searchResult.push(e);
      }
    });
    if (!isA) {
      selectedRowsB.forEach((e) => {
        searchResult.push(rows[e]);
      });
    }
    searchResult.sort();
    setRowsA(searchResult);
  };

  const handleSelect = (event, nodeIds) => {
    console.log("temp key values", _tempKeyValue);
    const arrayToSend = [];
    const tempValues = Object.values(_tempKeyValue);
    const tempKeys = Object.keys(_tempKeyValue);
    console.log("temp values", Object.values(_tempKeyValue));
    console.log("temp keys", tempKeys);
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
      indexesTR.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));
      console.log("indexes", indexesTR);
      for (let i = 0; i < indexesTR.length; i++) {
        toRemove.splice(indexesTR[i] - i, 1);
        toAdd.push(rows[indexesTR[indexesTR.length - 1 - i]]);
      }
      searchText.length ? handleSearch(true) : setRowsA(toRemove);
      setRowsB(toAdd);
    }
  };

  const handleRemoveSelection = () => {
    if (selectedRowsB.length) {
      let toAdd = [];
      let toRemove = [...rows];
      let indexesTR = [];
      rowsB.forEach((e) => indexesTR.push(e.id));
      console.log("before indexes", indexesTR);
      console.log("selection", selectedRowsB);
      selectedRowsB.forEach((e) => {
        let a = indexesTR.indexOf(e);
        console.log("index of", a, e);
        indexesTR.splice(a, 1);
      });
      indexesTR.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));
      console.log("indexes", indexesTR);
      for (let i = 0; i < indexesTR.length; i++) {
        toRemove.splice(indexesTR[i] - i, 1);
        toAdd.push(rows[indexesTR[indexesTR.length - 1 - i]]);
      }
      // console.log('to add', toAdd);
      // console.log('to remove', toRemove);
      searchText.length ? handleSearch(false) : setRowsA(toRemove);
      setRowsB(toAdd);
    }
  };

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
    let r = [];
    for (let i = 0; i < data.length; i++)
      r.push({
        id: i,
        fullName: data[i].nombre,
        dept: data[i].departamento,
        categoria_docente: data[i].categoria_docente,
        categoria_cientifica: data[i].categoria_cientifica,
        cargo_ocupacional: data[i].cargo_ocupacional,
        tipo_de_contrato: data[i].tipo_de_contrato,
      });
    if (data.length !== rowsA.length) setRows(r);
  };

  useEffect(() => {
    if (data) {
      createKeyValue(data);
    }
  }, [data]);

  useEffect(() => {
    if (pData) getProfessorsList(pData);
  }, [pData]);

  useEffect(() => {
    setRowsA(rows);
  }, [rows]);

  useEffect(() => {
    if (tabSelected === "usr") setSelected(rowsB);
  }, [rowsB]);

  const treeViewTittle = (
    <div style={{ display: "flex" }}>
      <div
        className={classes.headerSelector}
        style={{background: tabSelected === "org" ? "#242e41" : "transparent"}}
        onClick={() => {
          setSelected(['root']);
          setTabSelected("org");
        }}
      >
        <AccountTreeIcon style={{ margin: "0px 5px" }} fontSize="large" />
        <span
          style={
            tabSelected === "org"
              ? { textDecoration: "underline", fontWeight: "bold" }
              : {}
          }
        >
          ORGANIZACIONES ESTUDIANTILES
        </span>
      </div>
      <div
        className={classes.headerSelector}
        style={{background: tabSelected === "org" ? "#242e41" : "transparent"}}
        onClick={() => {
          setSelected([]);
          setTabSelected("usr");
        }}
      >
        <GroupIcon style={{ margin: "0px 5px" }} fontSize="large" />
        <span
          style={
            tabSelected === "org"
              ? {}
              : { textDecoration: "underline", fontWeight: "bold" }
          }
        >
          USUARIOS
        </span>
      </div>
    </div>
  );

  if ((tabSelected==="usr" && pLoading)||(tabSelected!=="usr" && orgLoading)) return <h1>Loading...</h1>;

  return (
    <Grid className={classes.container} container>
      <Grid className={classes.sideBarContainer}>
        {showSideBar && <SideBar darkMode={darkMode} />}
      </Grid>
      <Grid
        container
        justify="space-between"
        style={{
          minHeight: (window.visualViewport.height * 6) / 10,
        }}
      >
        <CardCharts title={treeViewTittle} darkMode={darkMode}>
          {tabSelected === "org" && (
            <div
              style={{
                flexGrow: 1,
                overflowY: "auto",
                overflowX: "hidden",
                minHeight: (window.visualViewport.height * 6) / 10,
                minWidth: window.visualViewport.width,
              }}
            >
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
                }}
              >
                {renderTree(data)}
              </TreeView>
            </div>
          )}
          {tabSelected === "usr" && (
            <div
              className={classes.table}
              style={{ minWidth: (window.visualViewport.width * 6) / 10 }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Input
                  style={searchStyle("20", false)}
                  placeholder="Introduzca un nombre..."
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button style={searchStyle("5", true)} onClick={handleSearch}>
                  Buscar
                </button>
              </div>
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
                  style={selectedRowsB.length ? {} : { color: "darkgray" }}
                  onClick={handleRemoveSelection}
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
      <OrganizationsTable
        selected={selected}
        tab={tabSelected}
        darkMode={darkMode}
      />
    </Grid>
  );
};

const CustomCard = ({ start, title, darkMode, items, noPie }) => {
  const ref = createRef(null);
  const [show, setShow] = useState({ display: "none" });
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const classes = useStyles();
  const download = (
    image,
    { name = `${title} captura`, extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div
      style={start ? { flex: 1, marginRight: 20 } : { flex: 1 }}
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {!noPie && show && (
        <div className={classes.exportButtons}>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => exportCSVFile(items, title)}
          >
            <TableChartIcon fontSize="small" />
          </button>
          <button onClick={downloadScreenshot}>
            <CameraAltIcon fontSize="small" />
          </button>
        </div>
      )}
      {noPie && show && (
        <div className={classes.exportButtons}
        >
          <button onClick={() => exportCSVFile(items, title)}>
            <TableChartIcon fontSize="small" />
          </button>
        </div>
      )}
      <div ref={ref}>
        <CardCharts title={title} darkMode={darkMode}>
          {noPie && <div style={{
              minHeight: "5rem",
              minHeight: "22rem",
              overflowY: "auto",
              justifyContent: "start",
              marginTop: "10px",
            }}>
            {items.map((e, i) => (
              <p key={i} style={{ fontSize: 15 }}>{`${e.name}: ${e.value}`}</p>
            ))}
          </div>}
          {items.length && !noPie && (
            <PieChart darkMode={darkMode} passedData={items} />
          )}
        </CardCharts>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.homepage.darkMode,
  showSideBar: state.homepage.showSideBar,
});

export default connect(mapStateToProps)(StatusPage);

const OrganizationsTable = ({ selected, tab, darkMode }) => {
  const {
    isLoading: orgLoading,
    isError: orgIsError,
    error: orgError,
    data: orgData,
  } = useQuery(
    ["fetchOrganizationStatitstics", selected],
    fetchOrganizationStatitstics
  );

  const {
    isLoading: usrsLoading,
    isError: usrsIsError,
    error: usrsError,
    data: usrsData,
  } = useQuery(
    ["fetchUsersSelectionStatitstics", selected],
    fetchUsersSelectionStatitstics
  );

  const arrangeItems = (stats, cardName) => {
    let r = [];
    if (cardName === "p") {
      r.push({
        name: "Docente",
        value: !stats["Docente"] ? 0 : stats["Docente"],
      });
      r.push({
        name: "No Docente",
        value: !stats["No Docente"] ? 0 : stats["No Docente"],
      });
    } else if (cardName === "cd") {
      r.push({
        name: "Asistente",
        value:
          typeof stats["Asistente"] === "undefined" ? 0 : stats["Asistente"],
      });
      r.push({
        name: "Auxiliar",
        value: typeof stats["Auxiliar"] === "undefined" ? 0 : stats["Auxiliar"],
      });
      r.push({
        name: "Instructor",
        value:
          typeof stats["Instructor"] === "undefined" ? 0 : stats["Instructor"],
      });
      r.push({
        name: "Titular",
        value: typeof stats["Titular"] === "undefined" ? 0 : stats["Titular"],
      });
    } else if (cardName === "cc") {
      r.push({
        name: "Master",
        value: typeof stats["Master"] === "undefined" ? 0 : stats["Master"],
      });
      r.push({
        name: "Doctor",
        value: typeof stats["Doctor"] === "undefined" ? 0 : stats["Doctor"],
      });
    } else if (cardName === "d") {
      Object.keys(stats.Departamento).forEach((e) => {
        r.push({
          name: e,
          value: stats.Departamento[e],
        });
      });
    } else if (cardName === "g") {
      r.push({
        name: "Femenino",
        value: typeof stats["Femenino"] === "undefined" ? 0 : stats["Femenino"],
      });
      r.push({
        name: "Masculino",
        value:
          typeof stats["Masculino"] === "undefined" ? 0 : stats["Masculino"],
      });
    } else if (cardName === "cac") {
      r.push({
        name: "Asistente Doctor",
        value:
          typeof stats["Asistente Doctor"] === "undefined"
            ? 0
            : stats["Asistente Doctor"],
      });
      r.push({
        name: "Asistente Master",
        value:
          typeof stats["Asistente Master"] === "undefined"
            ? 0
            : stats["Asistente Master"],
      });
      r.push({
        name: "Auxiliar Master",
        value:
          typeof stats["Auxiliar Master"] === "undefined"
            ? 0
            : stats["Auxiliar Master"],
      });
      r.push({
        name: "Auxiliar Doctor",
        value:
          typeof stats["Auxiliar Doctor"] === "undefined"
            ? 0
            : stats["Auxiliar Doctor"],
      });
      r.push({
        name: "Instructor Master",
        value:
          typeof stats["Instructor Master"] === "undefined"
            ? 0
            : stats["Instructor Master"],
      });
      r.push({
        name: "Instructor Doctor",
        value:
          typeof stats["Instructor Doctor"] === "undefined"
            ? 0
            : stats["Instructor Doctor"],
      });
      r.push({
        name: "Titular Doctor",
        value:
          typeof stats["Titular Doctor"] === "undefined"
            ? 0
            : stats["Titular Doctor"],
      });
      // r.push({
      //   name: "Masculino",
      //   value: typeof stats["Masculino"] === "undefined" ? 0 : stats["Masculino"],
      // });
    }
    return r;
  };

  if ((tab === "org" && orgLoading) || (tab === "usr" && usrsLoading))
    return <h2>Loading...</h2>;
  const data = tab === "usr" ? usrsData : orgData;

  if (data && Object.keys(data).length>0) {
    return (
      <div style={{ width: "100%" }}>
        <Grid container style={{ display: "flex", width: "100%" }}>
          <CustomCard
            title={"Personal"}
            start={true}
            darkMode={darkMode}
            items={arrangeItems(data, "p")}
          />
          <CustomCard
            title={"Categoría docente"}
            darkMode={darkMode}
            items={arrangeItems(data, "cd")}
          />
        </Grid>
        <Grid container style={{ display: "flex", width: "100%" }}>
          <CustomCard
            title={"Categoria científica"}
            start={true}
            darkMode={darkMode}
            items={arrangeItems(data, "cc")}
          />
          <CustomCard
            title={"Género"}
            darkMode={darkMode}
            items={arrangeItems(data, "g")}
          />
        </Grid>
        <Grid container style={{ display: "flex", width: "100%" }}>
          <CustomCard
            title={"Cat. docente - Cat. científica"}
            start={true}
            darkMode={darkMode}
            items={arrangeItems(data, "cac")}
          />
          <CustomCard
            title={"Departamento"}
            darkMode={darkMode}
            items={arrangeItems(data, "d")}
            noPie={true}
          />
        </Grid>
      </div>
    );
  } else {
    return <h3 style={{ color: "white" }}>No hay informacion disponible</h3>;
  }
};
