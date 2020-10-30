import React, { Component, PureComponent } from "react";
import getUsersFromDirectory from "../homepage/homepage.utils";
import CardCharts from "../../components/cardCharts/card-charts.component";
import "./homepage.styles.scss";
import TableRanking from "../../components/charts/chartRanking/table-ranking.component";
import Chart from "../../components/charts/chartFacultades/chart";

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      users: {},
    };
  }

  filterInformation() {
    let filteredProvincias = [];
    this.state.users.data.map((user) => {
      if (!filteredProvincias.includes(user.facultad_filial))
        filteredProvincias.push(user.facultad_filial);
    });
    console.log(filteredProvincias);
  }

  async componentDidMount() {
    try {
      const users = await getUsersFromDirectory();
      this.setState({ users: users });
    } catch (error) {
      console.log(error);
    }
    this.filterInformation();
  }
  render() {
    return (
      <div className="container">
        <CardCharts><Chart title = "Table 1"/></CardCharts>   
        <CardCharts><TableRanking title = "Table 2"/></CardCharts>  
        <CardCharts><Chart title = "Table 3"/></CardCharts>  
        <CardCharts><Chart title = "Table 4"/></CardCharts> 
        <CardCharts><Chart title = "Table 5"/></CardCharts> 
      </div>
    );
  }
}

export default HomePage;
