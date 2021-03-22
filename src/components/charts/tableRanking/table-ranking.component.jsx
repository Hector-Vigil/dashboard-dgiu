import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "#", minWidth: 50 },
  { id: "code", label: "Carrera", minWidth: 50 },

  {
    id: "size",
    label: " ✔ ",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: " (%) ",
    minWidth: 50,
    align: "center",
  },
];
// const width = () => (global.screen.width * 50) / 100;

function createData(name, code, size, density, id, facultyParent) {
  return { name, code, size, density, id, facultyParent };
}

let rows = [];

const useStyles = makeStyles((theme) => ({
  rootDark: {
    backgroundColor: "#27293d",
    color: "#f4f4f4",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 438,
  },
  rootLight: {
    backgroundColor: "#fff",
    color: "black",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 438,
  },
  container: {
    overflowY: "none",
    overflowX: "none",
    margin: "10px 10px",
  },
  tableCell: {
    hover: {
      cursor: "pointer",
    },
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

const cellStyleDark = {
  color: "#f4f4f4",
  borderBottom: "none",
  textAlign: "left",
  padding: "0.5rem",
  paddingRight: "0",
  fontFamily: "'Poppins', sans-serif",
};
const cellStyleLight = {
  color: "#3b3f51",
  borderBottom: "none",
  textAlign: "left",
  padding: "0.5rem",
  paddingRight: "0",
  fontFamily: "'Poppins', sans-serif",
};

export default function TableRanking({ data, expanded, darkMode }) {
  const classes = useStyles();

  rows = data.map((element, index) => {
    const major = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold" }}>{element.name}</span>
        <span
          style={{ fontStyle: "italic", fontSize: 12, fontWeight: "lighter" }}
        >
          {element.faculty}
        </span>
      </div>
    );
    return createData(
      index + 1,
      major,
      element.matchInformation,
      Math.round((element.matchInformation / element.total) * 100),
      element.id,
      element.facultyParent
    );
  });

  return (
    <Paper className={darkMode ? classes.rootDark : classes.rootLight}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    width: column.minWidth,
                    backgroundColor: "#1f8af8",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#f4f4f4",
                    borderBottom: "none",
                    padding: "0.5rem",
                    paddingRight: "0",
                    textAlign: "left",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => expanded(row.id, row.facultyParent)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={darkMode ? cellStyleDark : cellStyleLight}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
