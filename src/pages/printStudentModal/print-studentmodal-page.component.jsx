import React from "react";
import ReactDOM from "react-dom";
import TableModalPrintMode from "../../components/charts/tableModal/table-modal-print-mode.component";
import App from "../../App";

class PrintStudentModalPage extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		window.print();
		ReactDOM.render(<App />, document.getElementById("root"));
	}
	render() {
		const { data, nodeRoutes, nodeParams } = this.props;
		return (
			<TableModalPrintMode
				data={data}
				nodeRoutes={nodeRoutes}
				nodeParams={nodeParams}
			/>
		);
	}
}
export default PrintStudentModalPage;
