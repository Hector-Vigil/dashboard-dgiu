import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import normalizeProvinces from './chartUtils';

const width = () => (global.screen.width * 50) / 100;

const Chart = ({ data }) => {
  const { counter } = data;
  const information = data
    ? Object.keys(counter).map((element) => ({
        name: normalizeProvinces[element],
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
      <Bar dataKey="pv" stackId="a" fill="blue" />
      <Bar dataKey="uv" stackId="a" fill="red" />
    </BarChart>
  );
};

export default Chart;
