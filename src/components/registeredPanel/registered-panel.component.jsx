import React, { useEffect, useState } from "react";
import axios from "axios";
import FieldAgrupation from "../fieldSelection/field-agrupation.component";
import PieChart from "../charts/genericChart/pie-chart.component";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

const RegisteredPanel = (data) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const [params, setParams] = useState({
    facultie: "",
    courseType: "",
    major: "",
    year: "",
  });
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    fetchPieChartFilters();
  }, []);

  useEffect(() => {
    fetchPieChartInformation();
  }, [params]);

  const fetchPieChartFilters = async () => {
    setLoading(true);
    try {
      const filters = await axios.get(
        "http://localhost:3300/pie-chart-information"
      );
      setFilters(filters);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPieChartInformation = async () => {
    try {
      const { facultie, courseType, major, year } = params;
      if (facultie !== "" && courseType !== "" && major !== "" && year !== "") {
        const usersInformation = await axios.get(
          `http://localhost:3300/active-directory-match/${facultie}/${courseType}/${major}/${year}`
        );
        const verifiedName = Object.keys(usersInformation.data)[0];
        const notVerifiedName = Object.keys(usersInformation.data)[1];
        setPieChartData([
          {
            name: verifiedName,
            value: usersInformation.data.verified,
          },
          {
            name: notVerifiedName,
            value: usersInformation.data.notVerified,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const autoCompleteChangeHandler = (event, newValue) => {
    if (event.target.id.split("-")[0] === "Facultad")
      setParams({ ...params, facultie: newValue });
    if (event.target.id.split("-")[0] === "Tipo de Curso")
      setParams({ ...params, courseType: newValue });
    if (event.target.id.split("-")[0] === "Carrera")
      setParams({ ...params, major: newValue });
    if (event.target.id.split("-")[0] === "Año de Estudio")
      setParams({ ...params, year: newValue });
  };

  return (
    <div className={classes.container}>
      {pieChartData && pieChartData[0].value !== 0 && (
        <PieChart data={pieChartData} />
      )}
      {pieChartData && pieChartData[0].value == 0 && <p>No existe</p>}
      {!loading && filters && (
        <FieldAgrupation filters={filters} change={autoCompleteChangeHandler} />
      )}
    </div>
  );
};

export default RegisteredPanel;
