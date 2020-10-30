import React from "react";
import CardCharts from "../../components/cardCharts/card-charts.component";
import "./homepage.styles.scss";
import TableRanking from "../../components/charts/tableRanking/table-ranking.component";
import GenericChart from "../../components/charts/genericChart/generic-chart.component";

const HomePage = () => {
  return (
    <div className="container">
      <CardCharts title="Table 1">
        <GenericChart />
      </CardCharts>
      <CardCharts title="Table 2">
        <TableRanking />
      </CardCharts>
      <CardCharts title="Table 3">
        <GenericChart />
      </CardCharts>
      <CardCharts title="Table 4">
        <GenericChart />
      </CardCharts>
      <CardCharts title="Table 5">
        <GenericChart />
      </CardCharts>
    </div>
  );
};

export default HomePage;
