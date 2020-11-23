import react from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import CardChart from "../../components/cardCharts/card-charts.component";
import LinearProgress from "@material-ui/core/LinearProgress";
import RegisterPanel from "../../components/registeredPanel/registeredPanel";
import RegisteredPanel from "../../components/registeredPanel/registeredPanel";

const useStyles = makeStyles({
  card: {
    width: "20%",
  },
});

const InformationOverview = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      wrap="wrap"
      style={{ width: "80vw", marginRight: 32, marginTop: 50, height: "30%" }}
    >
      <CardChart title="Facultades UM">
        <Typography>2500</Typography>
        <LinearProgress
          style={{ width: 100, height: 10, marginTop: 6 }}
          variant="determinate"
          value={(2500 / 3000) * 100}
        />
      </CardChart>
      <CardChart title="Facultades UM">
        <Typography>2500</Typography>
        <LinearProgress
          style={{ width: 100, height: 10, marginTop: 6 }}
          variant="determinate"
          value={(2500 / 3000) * 100}
        />
      </CardChart>
      <CardChart title="Facultades UM">
        <Typography>2500</Typography>
        <LinearProgress
          style={{ width: 100, height: 10, marginTop: 6 }}
          variant="determinate"
          value={(2500 / 3000) * 100}
        />
      </CardChart>{" "}
      <CardChart title="Facultades UM">
        <Typography>2500</Typography>
        <LinearProgress
          style={{ width: 100, height: 10, marginTop: 6 }}
          variant="determinate"
          value={(2500 / 3000) * 100}
        />
      </CardChart>
    </Grid>
  );
};

export default InformationOverview;
