import React, { PureComponent } from "react";
import {
	PieChart,
	Pie,
	Sector,
	Cell,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@material-ui/core";

const data = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 },
];

const COLORS = [
	"#00bcd4",
	"#ec0101",
	"#fecd1a",
	"#f9813a",
	"#892cdc",
	"#d54062",
	"#81b214",
];

// let style = {
//   colorLight: {
//     color: "#3b3f51",
//   },
//   colorDark: {
//     color: "#f4f4f4",
//   },
// };

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="#f4f4f4"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
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
			<div style={{ width: "100%", height: 350 }}>
				<ResponsiveContainer>
					<PieChart
						style={
							this.props.darkMode
								? {
										color: "#f4f4f4",
								  }
								: { color: "#3b3f51" }
						}
					>
						<Pie
							data={this.props.data}
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={120}
							fill="#8884d8"
							stroke={this.props.darkMode ? "#f4f4f4" : "#3b3f51"}
							dataKey="value"
						>
							{this.props.data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Legend wrapperStyle={{ width: "100%" }} />
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
