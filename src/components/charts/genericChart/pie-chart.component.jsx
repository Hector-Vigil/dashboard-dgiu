import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#1f8af8', '#f50057', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartComponent extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <PieChart width={400} height={400} style={{ display: 'flex', justifyContent: 'center' }}>
        <Pie
          data={this.props.data ? this.props.data : data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          dataKey={this.props.data.name}
          legendType="square"
        >
          {this.props.data
            ? this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            : null}
        </Pie>
        <Legend verticalAlign="center" height={36} align="center" />
      </PieChart>
    );
  }
}
