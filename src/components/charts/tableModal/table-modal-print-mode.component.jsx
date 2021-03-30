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

export default function TableModalPrintMode({ data }) {
	const classes = useStyles();

	const dataPrueba = [
		{
			name: "Grettell",
			lastName: "Umpierrez Sardiñas",
			province: "Matanzas",
			zone: "Cuba",
			registered: true,
		},
		{
			name: "Grettell2",
			lastName: "Umpierrez Sardiñas",
			province: "Matanzas",
			zone: "Cuba",
			registered: false,
		},
		{
			name: "Grettell3",
			lastName: "Umpierrez Sardiñas",
			province: "Matanzas",
			zone: "Cuba",
			registered: true,
		},
	];

	// if (data) {
	// 	rows = data.map((user) => {
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

	if (dataPrueba) {
		rows = dataPrueba.map((user) => {
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

	return (
		<Paper className={classes.rootLight}>
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
										backgroundColor: "#f4f4f4",
										fontFamily:
											"'Times New Roman', Times, serif",
										color: "black",
										fontSize: 12,
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
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.code}
								>
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
													fontFamily:
														"'Times New Roman', Times, serif",
												}}
											>
												{column.format &&
												typeof value === "number"
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
