import react, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import CardChart from "../../components/cardCharts/card-charts.component";
import LinearProgress from "@material-ui/core/LinearProgress";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

const useStyles = makeStyles((theme) => ({
  numberAndIconContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  numberContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  progressAndStatsContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    width: "15vw",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "60vw",
    },
  },
  gridContainer: {
    width: "80vw",
    marginTop: 50,
    marginRight: 20,
    height: "30%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

const InformationOverview = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourseInformation();
  }, []);

  const fetchCourseInformation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:3300/getCourseTypesInfo"
      );
      setCourseData(data);
    } catch (error) {
      console, log(error);
    } finally {
      setLoading(false);
    }
  };
  const classes = useStyles();

  let courseTotal = {};
  let courseDaily = {};
  let courseSesions = {};
  let courseDistances;

  if (courseData) {
    console.log(courseData);
    let count = 0;
    let total = 0;
    Object.keys(courseData).map((elem) => {
      count += courseData[elem].count;
      total += courseData[elem].total;
    });
    courseTotal = {
      count,
      total,
    };
    courseDaily = {
      count:
        courseData["Curso Regular Diurno"].count +
        courseData["Curso Diurno"].count,
      total:
        courseData["Curso Regular Diurno"].total +
        courseData["Curso Diurno"].total,
    };
    courseSesions = {
      count: courseData["Curso por Encuentros"].count,
      total: courseData["Curso por Encuentros"].total,
    };
    courseDistances = {
      count: courseData["Enseñanza a Distancia"].count,
      total: courseData["Enseñanza a Distancia"].total,
    };
  }

  const getLinearProgressColor = (count, total) => {
    if ((count / total) * 100 < 50) return "secondary";
    return "primary";
  };
  return (
    !loading &&
    courseData && (
      <Grid
        className={classes.gridContainer}
        container
        justify="space-between"
        direction="row"
        wrap="wrap"
      >
        <CardChart>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div className={classes.numberContainer}>
                <Typography style={{ fontSize: 30 }}>
                  {courseTotal.count}
                </Typography>
                <span style={{ fontSize: 12 }}>TOTAL</span>
              </div>
              <PeopleAltIcon fontSize="large" style={{ paddingTop: 4 }} />
            </div>
            <div className={classes.progressAndStatsContainer}>
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseTotal.count / courseTotal.total) * 100}
                  color={getLinearProgressColor(
                    courseTotal.count,
                    courseTotal.total
                  )}
                />
              </div>
              <div className={classes.statsContainer}>
                <span>{`de ${courseTotal.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round((courseTotal.count / courseTotal.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardChart>
        <CardChart>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div className={classes.numberContainer}>
                <Typography style={{ fontSize: 30 }}>
                  {courseDaily.count}
                </Typography>
                <span style={{ fontSize: 12 }}>CURSO DIURNO</span>
              </div>
              <PeopleAltIcon fontSize="large" style={{ paddingTop: 4 }} />
            </div>
            <div className={classes.progressAndStatsContainer}>
              <div>
                <LinearProgress
                  variant="determinate"
                  value={(courseDaily.count / courseDaily.total) * 100}
                  style={{ height: 10, marginTop: 6 }}
                  color={getLinearProgressColor(
                    courseDaily.count,
                    courseDaily.total
                  )}
                />
              </div>
              <div className={classes.statsContainer}>
                <span>{`de ${courseDaily.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round((courseDaily.count / courseDaily.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardChart>
        <CardChart>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div className={classes.numberContainer}>
                <Typography style={{ fontSize: 30 }}>
                  {courseSesions.count}
                </Typography>
                <span style={{ fontSize: 12 }}>CURSO POR ENCUENTROS</span>
              </div>
              <PeopleAltIcon fontSize="large" style={{ paddingTop: 4 }} />
            </div>
            <div className={classes.progressAndStatsContainer}>
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseSesions.count / courseSesions.total) * 100}
                  color={getLinearProgressColor(
                    courseSesions.count,
                    courseSesions.total
                  )}
                />
              </div>
              <div className={classes.statsContainer}>
                <span>{`de ${courseSesions.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round(
                    (courseSesions.count / courseSesions.total) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </CardChart>
        <CardChart>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div className={classes.numberContainer}>
                <Typography style={{ fontSize: 30 }}>
                  {courseDistances.count}
                </Typography>
                <span style={{ fontSize: 12 }}>ENSEÑANZA A DISTANCIA</span>
              </div>
              <PeopleAltIcon fontSize="large" style={{ paddingTop: 4 }} />
            </div>
            <div className={classes.progressAndStatsContainer}>
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseDistances.count / courseDistances.total) * 100}
                  color={getLinearProgressColor(
                    courseDistances.count,
                    courseDistances.total
                  )}
                />
              </div>
              <div className={classes.statsContainer}>
                <span>{`de ${courseDistances.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round(
                    (courseDistances.count / courseDistances.total) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </CardChart>
      </Grid>
    )
  );
};

export default InformationOverview;
