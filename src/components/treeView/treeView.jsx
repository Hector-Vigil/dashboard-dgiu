import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "55vw",
    overflow: "auto",
    fontFamily: "'Poppins', sans-serif",
  },
  treeItem: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    paddingBottom: "0.5rem",
    justifyContent: "space-between",
    fontFamily: "'Poppins', sans-serif",
  },

  statsContainer: {
    // display: "flex",
    marginLeft: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    [theme.breakpoints.down("lg")]: {
      right: 350,
    },
    [theme.breakpoints.down("md")]: {
      right: 300,
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      marginLeft: 80,
    },

    height: "22px",
  },
}));

export default function RecursiveTreeView({ data, studentsOpenModalHandler }) {
  const classes = useStyles();
  const total = data.matchInformation ? data.matchInformation.total : 2000;
  const renderTree = (nodes) => (
    <div className={classes.treeItem}>
      <TreeItem
        onClick={
          nodes.children && nodes.children.length === 0
            ? () => studentsOpenModalHandler(nodes.routeParams)
            : null
        }
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
      {nodes.id !== "root" ? (
        <div className={classes.statsContainer}>
          <div
            style={{ height: 10, width: 70, margin: 0, fontSize: "0.7rem" }}
          >{`${Math.round((nodes.matchInformation / total) * 100)}%(${
            nodes.matchInformation
          })`}</div>
          <LinearProgress
            style={{ width: 100, height: 9, marginTop: 6 }}
            variant="determinate"
            color="secondary"
            value={
              nodes.matchInformation
                ? (nodes.matchInformation / total) * 100
                : 0
            }
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {data ? renderTree(data) : null}
    </TreeView>
  );
}
