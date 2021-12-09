import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import normalizeProvince from "./chartUtils";

const width = (number) => (global.screen.width * number) / 100;

const Chart = ({ data }) => {
  const { counter } = data;
  const information = data
    ? Object.keys(counter).map((element) => ({
        name: normalizeProvince[element],
        uv: counter[element],
        pv: counter[element],
        // amt: 2100,
      }))
    : [];

  return (
    <BarChart
      width={width(50)}
      barCategoryGap="5%"
      height={300}
      data={information}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{ color: "#f4f4f4" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" style={{ color: "#f4f4f4", fill: "#909091" }} />
      {/* <Label value='Estudiantes por países' offset={0} position="insideBottom" color= '#f4f4f4' style={{color:"#f4f4f4"}}/>
      </XAxis> */}
      <YAxis style={{ color: "#f4f4f4", fill: "#909091" }} />
      {/* label={{ value: 'Cantidad de estudiantes', angle: -90, position: 'insideBottomLeft', color: '#f4f4f4' }} */}
      <Tooltip />
      <Legend />
      <Bar name="Variable 1" dataKey="pv" fill="#f50057" />
      <Bar name="Variable 2" dataKey="uv" fill="#1f8af8" />
    </BarChart>
  );
};

export default Chart;
