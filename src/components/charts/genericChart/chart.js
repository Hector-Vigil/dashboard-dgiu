import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const width = () => (global.screen.width * 50) / 100;

const Chart = ({ data }) => {
  const { counter } = data;
  const information = data
    ? Object.keys(counter).map((element) => ({
        name: element,
        uv: counter[element],
        amt: 2100,
      }))
    : [];

  return (
    <BarChart
      width={width()}
      height={300}
      data={information}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
};

export default Chart;
