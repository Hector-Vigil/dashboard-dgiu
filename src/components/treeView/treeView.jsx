import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "80vw",
    overflow: "auto",
  },
  treeItem: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  statsContainer: {
    display: "flex",
    marginLeft: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    right: 500,
    [theme.breakpoints.down("lg")]: {
      right: 30,
    },
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      marginLeft: 40,
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
          <span style={{ height: 20, width: 70, margin: 0 }}>{`${Math.round(
            (nodes.matchInformation / total) * 100
          )}%(${nodes.matchInformation})`}</span>
          <LinearProgress
            style={{ width: 100, height: 10, marginTop: 6 }}
            variant="determinate"
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
