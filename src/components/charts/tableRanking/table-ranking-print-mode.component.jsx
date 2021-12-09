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
  { id: "rank", label: "#", minWidth: 50 },
  { id: "careerName_faculty", label: "Carrera/Facultad", minWidth: 50 },

  {
    id: "verified",
    label: " ✔ ",
    minWidth: 50,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "percent",
    label: " (%) ",
    minWidth: 50,
    align: "center",
  },
];
// const width = () => (global.screen.width * 50) / 100;

function createData(rank, careerName_faculty, verified, percent) {
  return { rank, careerName_faculty, verified, percent };
}

let rows = [];

const useStyles = makeStyles((theme) => ({
  rootLight: {
    backgroundColor: "#fff",
    color: "black",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
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
}));

export default function TableRankingPrintMode({ data }) {
  const classes = useStyles();

  rows = data.map((element, index) => {
    const major = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold" }}>{element.name}</span>
        <span
          style={{
            fontStyle: "italic",
            fontSize: 12,
            fontWeight: "lighter",
          }}
        >
          {element.faculty}
        </span>
      </div>
    );
    return createData(
      index + 1,
      major,
      element.matchInformation,
      Math.round((element.matchInformation / element.total) * 100)
      // element.id,
      // element.facultyParent
    );
  });

  return (
    <Paper className={classes.rootLight}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    width: column.minWidth,
                    backgroundColor: "#f4f4f4",
                    fontFamily: "'Times New Roman', Times, serif",
                    color: "black",
                    fontSize: 12,
                    borderBottom: "none",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          color: "black",
                          borderBottom: "none",
                          textAlign: "left",
                          padding: "0.3rem 2rem",
                          fontSize: 11,
                          paddingRight: "0",
                          fontFamily: "'Times New Roman', Times, serif",
                        }}
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
