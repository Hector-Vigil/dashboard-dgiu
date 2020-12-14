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
    width: "100%",
    overflow: "auto",
    fontFamily: "'Poppins', sans-serif",
    flexShrink: 0,
    height: 458,
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

  statsContainer: {
    // display: "flex",
    marginLeft: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    //position: "absolute",
    [theme.breakpoints.down("lg")]: {
      right: 350,
    },
    [theme.breakpoints.down("md")]: {
      right: 300,
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      right: 0,
      marginBottom: 5,
    },

    height: "22px",
  },
  colorPrimary: {
    backgroundColor: "#f2f4c0",
  },
  barColorPrimary: {
    backgroundColor: "#f6830f",
  },
}));

export default function RecursiveTreeView({
  data,
  studentsOpenModalHandler,
  expanded,
  nodes,
  darkMode,
}) {
  const classes = useStyles();

  const getLinearProgressColor = (count, total) => {
    if ((count / total) * 100 <= 35) return "secondary";
    return "primary";
  };

  const getLinearProgressColorMiddle = (count, total) => {
    if ((count / total) * 100 > 35 && (count / total) * 100 < 100)
      return {
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      };
  };

  const renderTree = (nodes) => (
    <div
      className={darkMode ? classes.treeItemDark : classes.treeItemLight}
      onClick={
        nodes.children && nodes.children.length === 0
          ? () => studentsOpenModalHandler(nodes.routeParams)
          : null
      }
    >
      <TreeItem
        onClick={() => expanded(nodes.id)}
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        style={{ width: "100%", textAlign: "left" }}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
      {nodes.id !== "root" ? (
        <div className={classes.statsContainer}>
          <div
            style={{
              height: 10,
              margin: 0,
              fontSize: "0.7rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{`${nodes.matchInformation} DE ${nodes.total}`}</div>
            <div>{`${Math.round(
              (nodes.matchInformation / nodes.total) * 100
            )}%`}</div>
          </div>
          <LinearProgress
            style={{ width: 100, height: 8, marginTop: 6 }}
            variant="determinate"
            value={
              nodes.matchInformation
                ? (nodes.matchInformation / nodes.total) * 100
                : 0
            }
            color={getLinearProgressColor(nodes.matchInformation, nodes.total)}
            classes={getLinearProgressColorMiddle(
              nodes.matchInformation,
              nodes.total
            )}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      expanded={nodes}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {data ? renderTree(data) : null}
    </TreeView>
  );
}
