import react from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import CardChart from "../../components/cardCharts/card-charts.component";
import LinearProgress from "@material-ui/core/LinearProgress";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

const useStyles = makeStyles({
  numberAndIconContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  numberContainer: {
    display: "flex",
    flexDirection: "column",
  },
  progressAndStatsContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    width: "15vw",
    minWidth: "160px",
  },
  root: {
    colorPrimary: "red",
  },
});

const InformationOverview = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-around"
      direction="row"
      spacing="5"
      wrap="wrap"
      style={{ width: "50vw", marginTop: 50, marginRight: 25, height: "30%" }}
    >
      <CardChart>
        <div className={classes.container}>
          <div className={classes.numberAndIconContainer}>
            <div className={classes.numberContainer}>
              <Typography
                style={{ fontSize: 30, fontFamily: "'Poppins',sans-serif" }}
              >
                2500
              </Typography>
              <span>Total</span>
            </div>
            <PeopleAltIcon fontSize="large" style={{ paddingTop: 4 }} />
          </div>
          <div className={classes.progressAndStatsContainer}>
            <div>
              <LinearProgress
                style={{ height: 10, marginTop: 6 }}
                variant="determinate"
                value={(2500 / 3000) * 100}
              />
            </div>
            <div className={classes.statsContainer}>
              <span>de 3000</span>
              <span style={{ margin: "0 0" }}>{(2000 / 2500) * 100}%</span>
            </div>
          </div>
        </div>
      </CardChart>
      <CardChart>
        <div className={classes.container}>
          <div className={classes.numberAndIconContainer}>
            <div className={classes.numberContainer}>
              <Typography
                style={{ fontSize: 30, fontFamily: "'Poppins',sans-serif" }}
              >
                2500
              </Typography>
              <span>Total</span>
            </div>
            <PermIdentityOutlinedIcon
              fontSize="large"
              style={{ paddingTop: 4, position: "relative", left: "2.8rem" }}
            />
            <CheckRoundedIcon
              fontSize="medium"
              style={{ paddingTop: 4, position: "relative", top: "1.2rem" }}
            />
          </div>
          <div className={classes.progressAndStatsContainer}>
            <div>
              <LinearProgress
                variant="determinate"
                value={(2500 / 3000) * 100}
                style={{ height: 10, marginTop: 6 }}
              />
            </div>
            <div className={classes.statsContainer}>
              <span>de 3000</span>
              <span style={{ margin: "0 0" }}>{(2000 / 2500) * 100}%</span>
            </div>
          </div>
        </div>
      </CardChart>
      <CardChart>
        <div className={classes.container}>
          <div className={classes.numberAndIconContainer}>
            <div className={classes.numberContainer}>
              <Typography
                style={{ fontSize: 30, fontFamily: "'Poppins',sans-serif" }}
              >
                2500
              </Typography>
              <span>Total</span>
            </div>
            <PermIdentityOutlinedIcon
              fontSize="large"
              style={{ paddingTop: 4, position: "relative", left: "2.8rem" }}
            />
            <CheckRoundedIcon
              fontSize="medium"
              style={{ paddingTop: 4, position: "relative", top: "1.2rem" }}
            />
          </div>
          <div className={classes.progressAndStatsContainer}>
            <div>
              <LinearProgress
                style={{ height: 10, marginTop: 6 }}
                variant="determinate"
                value={(2500 / 3000) * 100}
              />
            </div>
            <div className={classes.statsContainer}>
              <span>de 3000</span>
              <span style={{ margin: "0 0" }}>{(2000 / 2500) * 100}%</span>
            </div>
          </div>
        </div>
      </CardChart>
      <CardChart>
        <div className={classes.container}>
          <div className={classes.numberAndIconContainer}>
            <div className={classes.numberContainer}>
              <Typography
                style={{ fontSize: 30, fontFamily: "'Poppins',sans-serif" }}
              >
                2500
              </Typography>
              <span>Total</span>
            </div>
            <PermIdentityOutlinedIcon
              fontSize="large"
              style={{ paddingTop: 4, position: "relative", left: "2.8rem" }}
            />
            <CheckRoundedIcon
              fontSize="medium"
              style={{ paddingTop: 4, position: "relative", top: "1.2rem" }}
            />
          </div>
          <div className={classes.progressAndStatsContainer}>
            <div>
              <LinearProgress
                style={{ height: 10, marginTop: 6 }}
                variant="determinate"
                value={(2500 / 3000) * 100}
              />
            </div>
            <div className={classes.statsContainer}>
              <span>de 3000</span>
              <span style={{ margin: "0 0" }}>{(2000 / 2500) * 100}%</span>
            </div>
          </div>
        </div>
      </CardChart>
    </Grid>
  );
};

export default InformationOverview;
