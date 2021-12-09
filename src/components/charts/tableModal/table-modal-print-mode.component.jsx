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

export default function TableModalPrintMode({ data, nodeRoutes, nodeParams }) {
  const classes = useStyles();
  // const dataPrueba = [
  // 	{
  // 		name: "Grettell",
  // 		lastName: "Umpierrez Sardiñas",
  // 		province: "Matanzas",
  // 		zone: "Cuba",
  // 		registered: true,
  // 	},
  // 	{
  // 		name: "Grettell2",
  // 		lastName: "Umpierrez Sardiñas",
  // 		province: "Matanzas",
  // 		zone: "Cuba",
  // 		registered: false,
  // 	},
  // 	{
  // 		name: "Grettell3",
  // 		lastName: "Umpierrez Sardiñas",
  // 		province: "Matanzas",
  // 		zone: "Cuba",
  // 		registered: true,
  // 	},
  // ];

  if (data) {
    rows = data.map((user) => {
      const verified = (
        <span
          style={{
            color: "green",
            fontSize: 24,
            alignContent: "center",
          }}
        >
          ✔
        </span>
      );
      const notVerified = (
        <span
          style={{
            color: "red",
            fontSize: 24,
            alignContent: "center",
          }}
        >
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

  // if (dataPrueba) {
  // 	rows = dataPrueba.map((user) => {
  // 		const verified = (
  // 			<span
  // 				style={{
  // 					color: "green",
  // 					fontSize: 24,
  // 					alignContent: "center",
  // 				}}
  // 			>
  // 				✔
  // 			</span>
  // 		);
  // 		const notVerified = (
  // 			<span
  // 				style={{
  // 					color: "red",
  // 					fontSize: 24,
  // 					alignContent: "center",
  // 				}}
  // 			>
  // 				✖
  // 			</span>
  // 		);

  // 		return createData(
  // 			user.name,
  // 			user.lastName,
  // 			user.province,
  // 			user.zone,
  // 			user.registered ? verified : notVerified
  // 		);
  // 	});
  // }
  // console.log(nodeRoutes);
  // console.log(nodeRoutes.children);
  // console.log(nodeParams);

  const faculty = nodeRoutes.children.filter(
    (node) => node.id == nodeParams[1]
  );
  // console.log(faculty);
  const major = faculty[0]
    ? faculty[0].children.filter((node) => node.id == nodeParams[2])
    : null;

  const course_type = major[0]
    ? major[0].children.filter((node) => node.id == nodeParams[3])
    : null;

  const year = course_type[0]
    ? course_type[0].children.filter((node) => node.id == nodeParams[4])
    : null;

  const facultyName = faculty[0] ? "Facultad: " + faculty[0].name : "";
  const majorName = major[0] ? "Carrera: " + major[0].name : "";
  const courseTypeName = course_type[0]
    ? "Tipo de Curso: " + course_type[0].name
    : "";
  const yearName = year[0] ? " Año: " + year[0].name : "";

  const header = () => (
    <span>
      {facultyName +
        " || " +
        majorName +
        " || " +
        courseTypeName +
        " ||" +
        yearName}
    </span>
  );

  return (
    <Paper className={classes.rootLight}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <h6
                style={{
                  backgroundColor: "#f4f4f4",
                  fontFamily: "'Times New Roman', Times, serif",
                  color: "black",
                  fontSize: 12,
                  width: "100%",
                  borderBottom: "none",
                  marginLeft: "1rem",
                }}
              >
                {header()}
              </h6>
            </TableRow>
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
                    fontSize: 11,
                    fontWeight: "bold",
                    borderBottom: "none",
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
                          padding: "0.3rem 1rem",
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
