import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  header: {
    "& div.MuiDataGrid-columnHeaderTitle": {
      color: "white",
      // color: theme.palette.text.color
    },

    "& span.MuiCheckbox-root": {
      color: "white",
      // color: theme.palette.text.color
    },
    "& div.MuiDataGrid-root": {
      color: "white",
      lineHeight: "35px",
      minLineHeight: "35px",
      // color: theme.palette.text.color
    },
    "& div.MuiTablePagination-root": {
      color: "white",
      // color: theme.palette.text.color
    },
    "& div.MuiDataGrid-row": {
      minHeight: "35px",
      // color: theme.palette.text.color
    },
    "& div.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "transparent",
      // color: theme.palette.text.color
    },
  },
}));

const Table = ({ rows, columns, onSelectionChange, onPurge }) => {
  const classes = useStyless();
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <span className="horizontal-line" />
      <div className={classes.header} style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionChange={onSelectionChange}
        />
      </div>
    </div>
  );
};

export default Table;
