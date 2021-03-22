import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, makeStyles, Typography, withStyles } from "@material-ui/core";
import CardChart from "../../components/cardCharts/card-charts.component";
import LinearProgress from "@material-ui/core/LinearProgress";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { VerifiedUserRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  numberAndIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 73,
  },
  numberContainerDark: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  numberContainerLight: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    color: "#3b3f51",
  },
  progressAndStatsContainerDark: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  progressAndStatsContainerLight: {
    display: "flex",
    color: "#3b3f51",
    flexDirection: "column",
    paddingTop: 10,
  },
  statsContainerDark: {
    display: "flex",
    justifyContent: "space-between",
  },
  statsContainerLight: {
    display: "flex",
    color: "#3b3f51",
    justifyContent: "space-between",
  },

  iconDark: {
    color: "#f4f4f4",
  },

  iconLight: {
    color: "#3b3f51",
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
  gridContainerDark: {
    width: "80vw",
    marginTop: 50,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  gridContainerLight: {
    width: "80vw",
    marginTop: 50,
    marginRight: 20,
    color: "#3b3f51",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },

  colorDark: {
    color: "#f4f4f4",
  },

  colorLight: {
    color: "#3b3f51",
  },

  colorPrimary: {
    backgroundColor: "#f2f4c0",
  },
  barColorPrimary: {
    backgroundColor: "#f6830f",
  },
}));

const InformationOverview = ({ darkMode }) => {
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
      console.log(error);
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
    if ((count / total) * 100 <= 35) return "secondary";
    return "primary";
  };
  const getLinearProgressColorMiddle = (count, total) => {
    if ((count / total) * 100 > 35 && (count / total) * 100 < 70)
      return {
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      };
    return { classes };
  };
  return (
    !loading &&
    courseData && (
      <Grid
        className={
          darkMode ? classes.gridContainerDark : classes.gridContainerLight
        }
        container
        justify="space-between"
        direction="row"
        wrap="wrap"
      >
        <CardChart darkMode={darkMode}>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div
                className={
                  darkMode
                    ? classes.numberContainerDark
                    : classes.numberContainerLight
                }
              >
                <Typography
                  classes={
                    darkMode
                      ? { root: classes.colorDark }
                      : { root: classes.colorLight }
                  }
                  style={{ fontSize: 30 }}
                >
                  {courseTotal.count}
                </Typography>
                <span style={{ fontSize: 12 }}>TOTAL</span>
              </div>
              <PeopleAltIcon
                className={darkMode ? classes.iconDark : classes.iconLight}
                fontSize="large"
                style={{ paddingTop: 4 }}
              />
            </div>
            <div
              className={
                darkMode
                  ? classes.progressAndStatsContainerDark
                  : classes.progressAndStatsContainerLight
              }
            >
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseTotal.count / courseTotal.total) * 100}
                  color={getLinearProgressColor(
                    courseTotal.count,
                    courseTotal.total
                  )}
                  classes={getLinearProgressColorMiddle(
                    courseTotal.count,
                    courseTotal.total
                  )}
                />
              </div>
              <div
                className={
                  darkMode
                    ? classes.statsContainerDark
                    : classes.statsContainerLight
                }
              >
                <span>{`de ${courseTotal.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round((courseTotal.count / courseTotal.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardChart>
        <CardChart darkMode={darkMode}>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div
                className={
                  darkMode
                    ? classes.numberContainerDark
                    : classes.numberContainerLight
                }
              >
                <Typography
                  classes={
                    darkMode
                      ? { root: classes.colorDark }
                      : { root: classes.colorLight }
                  }
                  style={{ fontSize: 30 }}
                >
                  {courseDaily.count}
                </Typography>
                <span style={{ fontSize: 12 }}>CURSO DIURNO</span>
              </div>
              <VerifiedUserRounded
                className={darkMode ? classes.iconDark : classes.iconLight}
                fontSize="large"
                style={{ paddingTop: 4 }}
              />
            </div>
            <div
              className={
                darkMode
                  ? classes.progressAndStatsContainerDark
                  : classes.progressAndStatsContainerLight
              }
            >
              <div>
                <LinearProgress
                  variant="determinate"
                  value={(courseDaily.count / courseDaily.total) * 100}
                  style={{ height: 10, marginTop: 6 }}
                  color={getLinearProgressColor(
                    courseDaily.count,
                    courseDaily.total
                  )}
                  classes={getLinearProgressColorMiddle(
                    courseDaily.count,
                    courseDaily.total
                  )}
                />
              </div>
              <div
                className={
                  darkMode
                    ? classes.statsContainerDark
                    : classes.statsContainerLight
                }
              >
                <span>{`de ${courseDaily.total}`}</span>
                <span style={{ margin: "0 0" }}>
                  {Math.round((courseDaily.count / courseDaily.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardChart>
        <CardChart darkMode={darkMode}>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div
                className={
                  darkMode
                    ? classes.numberContainerDark
                    : classes.numberContainerLight
                }
              >
                <Typography
                  classes={
                    darkMode
                      ? { root: classes.colorDark }
                      : { root: classes.colorLight }
                  }
                  style={{ fontSize: 30 }}
                >
                  {courseSesions.count}
                </Typography>
                <span style={{ fontSize: 12 }}>CURSO POR ENCUENTROS</span>
              </div>
              <VerifiedUserRounded
                className={darkMode ? classes.iconDark : classes.iconLight}
                fontSize="large"
                style={{ paddingTop: 4 }}
              />
            </div>
            <div
              className={
                darkMode
                  ? classes.progressAndStatsContainerDark
                  : classes.progressAndStatsContainerLight
              }
            >
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseSesions.count / courseSesions.total) * 100}
                  color={getLinearProgressColor(
                    courseSesions.count,
                    courseSesions.total
                  )}
                  classes={getLinearProgressColorMiddle(
                    courseSesions.count,
                    courseSesions.total
                  )}
                />
              </div>
              <div
                className={
                  darkMode
                    ? classes.statsContainerDark
                    : classes.statsContainerLight
                }
              >
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
        <CardChart darkMode={darkMode}>
          <div className={classes.container}>
            <div className={classes.numberAndIconContainer}>
              <div
                className={
                  darkMode
                    ? classes.numberContainerDark
                    : classes.numberContainerLight
                }
              >
                <Typography
                  classes={
                    darkMode
                      ? { root: classes.colorDark }
                      : { root: classes.colorLight }
                  }
                  style={{ fontSize: 30 }}
                >
                  {courseDistances.count}
                </Typography>
                <span style={{ fontSize: 12 }}>ENSEÑANZA A DISTANCIA</span>
              </div>
              <VerifiedUserRounded
                className={darkMode ? classes.iconDark : classes.iconLight}
                fontSize="large"
                style={{ paddingTop: 4 }}
              />
            </div>
            <div
              className={
                darkMode
                  ? classes.progressAndStatsContainerDark
                  : classes.progressAndStatsContainerLight
              }
            >
              <div>
                <LinearProgress
                  style={{ height: 10, marginTop: 6 }}
                  variant="determinate"
                  value={(courseDistances.count / courseDistances.total) * 100}
                  color={getLinearProgressColor(
                    courseDistances.count,
                    courseDistances.total
                  )}
                  classes={getLinearProgressColorMiddle(
                    courseDistances.count,
                    courseDistances.total
                  )}
                />
              </div>
              <div
                className={
                  darkMode
                    ? classes.statsContainerDark
                    : classes.statsContainerLight
                }
              >
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