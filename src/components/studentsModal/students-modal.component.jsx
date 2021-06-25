import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TableModal from "../../components/charts/tableModal/table-modal.component";
import PrintStudentModalPage from "../../pages/printStudentModal/print-studentmodal-page.component";
import IconButton from "@material-ui/core/IconButton";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paperDark: {
		position: "absolute",
		backgroundColor: "#27293d",
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "75%",
		height: "50%",
		overflow: "auto",
	},
	paperLight: {
		position: "absolute",
		backgroundColor: "#fff",
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		width: "75%",
		height: "50%",
		overflow: "auto",
	},
	modalHeaderDark: {
		color: "#f4f4f4",
		textAlign: "center",
		fontWeight: "lighter",
	},
	modalHeaderLight: {
		color: "#3b3f51",
		textAlign: "center",
		fontWeight: "normal",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

// class StudentsModal extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			printModeModal: false,
// 		};
// 	}

// 	render() {
// 		const classes = useStyles();
// 		const [modalStyle] = React.useState(getModalStyle);
// 		const { printModeModal } = this.state;
// 		const {
// 			darkMode,
// 			openModal,
// 			studentsCloseModalHandler,
// 			data,
// 		} = this.props;

// 		const body = (
// 			<div
// 				style={modalStyle}
// 				className={darkMode ? classes.paperDark : classes.paperLight}
// 			>
// 				<div className={classes.header}>
// 					<span></span>
// 					<h2
// 						className={
// 							darkMode
// 								? classes.modalHeaderDark
// 								: classes.modalHeaderLight
// 						}
// 					>
// 						ESTUDIANTES
// 					</h2>
// 					<IconButton
// 						style={
// 							darkMode
// 								? { color: "#f4f4f4" }
// 								: { color: " #1f1f2f" }
// 						}
// 						onClick={() => setPrintModeModal(true)}
// 					>
// 						<PrintOutlinedIcon />
// 					</IconButton>
// 				</div>
// 				{data && <TableModal darkMode={darkMode} data={data} />}
// 				<StudentsModal />
// 			</div>
// 		);
// 		return (
// 			<Modal
// 				open={openModal}
// 				onClose={studentsCloseModalHandler}
// 				aria-labelledby="simple-modal-title"
// 				aria-describedby="simple-modal-description"
// 			>
// 				{data ? body : null}
// 			</Modal>
// 		);
// 	}
// }
// export default StudentsModal;

export default function StudentsModal({
	openModal,
	studentsCloseModalHandler,
	data,
	darkMode,
	nodeRoutes,
	nodeParams,
}) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);

	// const [printModeModal, setPrintModeModal] = useState(false);

	// if (data) console.log(data);
	const body = (
		<div
			style={modalStyle}
			className={darkMode ? classes.paperDark : classes.paperLight}
		>
			<div className={classes.header}>
				<span></span>
				<h2
					className={
						darkMode
							? classes.modalHeaderDark
							: classes.modalHeaderLight
					}
				>
					ESTUDIANTES
				</h2>
				<IconButton
					style={
						darkMode ? { color: "#f4f4f4" } : { color: " #1f1f2f" }
					}
					onClick={() =>
						ReactDOM.render(
							<PrintStudentModalPage
								nodeRoutes={nodeRoutes}
								nodeParams={nodeParams}
								data={data}
							/>,
							document.getElementById("root")
						)
					}
				>
					<PrintOutlinedIcon />
				</IconButton>
			</div>
			{data && <TableModal darkMode={darkMode} data={data} />}
			<StudentsModal />
		</div>
	);

	return (
		<Modal
			open={openModal}
			onClose={studentsCloseModalHandler}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			{data ? body : null}
		</Modal>
	);
}
