import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "#", minWidth: 50 },
  { id: "code", label: "Facultad", minWidth: 100 },

  {
    id: "size",
    label: "✔",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "(%)",
    minWidth: 50,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
// const width = () => (global.screen.width * 50) / 100;

function createData(name, code, size, density) {
  return { name, code, size, density };
}

let rows = [];

const useStyles = makeStyles({
  root: {
    backgroundColor: "#27293d",
    color: "#f4f4f4",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "38vw",
  },
  container: {
    overflowY: "none",
    overflowX: "none",
    margin: "10px 10px",
  },
});

const cellStyle = {
  color: "#f4f4f4",
  borderBottom: "none",
  textAlign: "left",
  padding: "0.5rem",
  paddingRight: "0",
  fontFamily: "'Poppins', sans-serif",
};
const pagStyle = {
  color: "#f4f4f4",
  borderBottom: "none",
  fontFamily: "'Poppins', sans-serif",
};

export default function TableRanking({ data }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (data.children) {
    const total = data.matchInformation.total;
    const sortedArray = data.children.sort((a, b) => {
      return b.matchInformation - a.matchInformation;
    });
    rows = sortedArray.map((element, index) => {
      return createData(
        index + 1,
        element.name,
        element.matchInformation,
        Math.round((element.matchInformation / total) * 100)
      );
    });
  }

  return (
    <Paper className={classes.root}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={cellStyle}
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
      <TablePagination
        style={pagStyle}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
