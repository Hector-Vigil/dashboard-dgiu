import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import { connect } from "react-redux";

import { useQueryClient, useQuery } from "react-query";

import CardCharts from "../components/cardCharts/card-charts.component";
import SideBar from "../components/sideBar/sidebar.component";
import { fetchOrganizationTree } from "../api";

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
    display: "flex",
    width: "100%",
    overflow: "auto",
    fontFamily: "'Poppins', sans-serif",
    flexShrink: 0,
    height: 750,
  },
  treeItemDark: {
    display: "flex",
    width: "100%",
    paddingBottom: "0.5rem",
    justifyContent: "space-between",
    fontFamily: "'Poppins', sans-serif",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  treeItemLight: {
    display: "flex",
    width: "100%",
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

  const [selected, setSelected] = useState([]);

  const queryClient = new useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    "fetchOrganizationData",
    fetchOrganizationTree
  );

  const handleSelect = (event, nodeIds) => {
    const arrayToSend = [];
    Object.keys(_tempKeyValue).forEach((key) => {
      const elementToAdd = nodeIds.find((id) => id.toString() === key);
      console.log(elementToAdd);
      if (elementToAdd) arrayToSend.push(_tempKeyValue[elementToAdd]);
    });
    setSelected(nodeIds);
  };

  const renderTree = (nodes) => (
    <div className={darkMode ? classes.treeItemDark : classes.treeItemLight}>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
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
    if (nodes.id === "root") {
      _tempKeyValue[nodes.id] = nodes.name;
    }
    if (Array.isArray(nodes.children)) {
      nodes.children.map((node) => {
        _tempKeyValue[node.id] = node.name;
        createKeyValue(node.children);
      });
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

  if (isLoading) return <h1>Loading...</h1>;

  createKeyValue(data);

  return (
    <Grid className={classes.container} container>
      <Grid className={classes.sideBarContainer}>
        {showSideBar && <SideBar darkMode={darkMode} />}
      </Grid>
      <Grid container justify="space-between">
        <CardCharts title={treeViewTittle} darkMode={darkMode}>
          <TreeView
            className={classes.root}
            defaultExpanded={["root"]}
            multiSelect
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={selected}
            onNodeSelect={handleSelect}
          >
            {renderTree(data)}
          </TreeView>
        </CardCharts>
        <CardCharts title="Data" darkMode={darkMode}>
          <h1>Hello</h1>
        </CardCharts>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.homepage.darkMode,
  showSideBar: state.homepage.showSideBar,
});

export default connect(mapStateToProps)(StatusPage);
