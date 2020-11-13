import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
  },
  treeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'rows',
    marginLeft: '20px',
    marginRight: '8px',
    height: '48px',
  },
});

export default function RecursiveTreeView({ data }) {
  // const progressBar = (nodes) => {
  //   return nodes.id !== 'root' ? (
  //     <div className={classes.statsContainer}>
  //       <span style={{ paddingTop: '9px', width: '70px', margin: '0' }}>{`${Math.round(
  //         (nodes.matchInformation / total) * 100
  //       )}%(${nodes.matchInformation})`}</span>
  //       <LinearProgress
  //         style={{ width: '100px', height: '10px', marginTop: '15px' }}
  //         variant="determinate"
  //         color="secondary"
  //         value={nodes.matchInformation ? (nodes.matchInformation / total) * 100 : 0}
  //       />
  //     </div>
  //   ) : null;
  // };

  const classes = useStyles();
  const total = data.matchInformation ? data.matchInformation.registeredId : 2000;
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const renderTree = (nodes) => (
    <div className={classes.treeItem}>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        style={{ marginTop: '8px' }}
      >
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
      {nodes.id !== 'root' ? (
        <div className={classes.statsContainer}>
          <span style={{ paddingTop: '9px', width: '70px', margin: '0' }}>{`${Math.round(
            (nodes.matchInformation / total) * 100
          )}%(${nodes.matchInformation})`}</span>
          <LinearProgress
            style={{ width: '100px', height: '10px', marginTop: '15px' }}
            variant="determinate"
            color="secondary"
            value={nodes.matchInformation ? (nodes.matchInformation / total) * 100 : 0}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {data ? renderTree(data) : null}
    </TreeView>
  );
}
