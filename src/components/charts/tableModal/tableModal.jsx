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
  { id: "name", label: "Nombre", minWidth: 50 },
  { id: "lastName", label: "Apellidos", minWidth: 50 },

  {
    id: "province",
    label: "Provincia",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "zone",
    label: "Municipio",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "verified",
    label: "Verificado",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, lastName, province, zone, verified) {
  return { name, lastName, province, zone, verified };
}

let rows = [];

const useStyles = makeStyles({
  rootDark: {
    backgroundColor: "#27293d",
    color: "#f4f4f4",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  rootLight: {
    backgroundColor: "#fff",
    color: "#f4f4f4",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  container: {
    overflowY: "auto",
    overflowX: "auto",
  },
});

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

const pagStyleDark = {
  color: "#f4f4f4",
  borderBottom: "none",
  fontFamily: "'Poppins', sans-serif",
};
const pagStyleLight = {
  color: "#3b3f51",
  borderBottom: "none",
  fontFamily: "'Poppins', sans-serif",
};

export default function TableModal({ data, darkMode }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (data) {
    rows = data.map((user) => {
      const verified = (
        <span style={{ color: "green", fontSize: 24, alignContent: "center" }}>
          ✔
        </span>
      );
      const notVerified = (
        <span style={{ color: "red", fontSize: 24, alignContent: "center" }}>
          ✖
        </span>
      );

      return createData(
        user.name,
        user.lastName,
        user.province,
        user.zone,
        user.registered ? verified : notVerified
      );
    });
  }

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
      <TablePagination
        style={darkMode ? pagStyleDark : pagStyleLight}
        rowsPerPageOptions={[10, 25, 100]}
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
