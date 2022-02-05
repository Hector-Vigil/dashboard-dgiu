import React from "react";
import "./card-charts.styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

let style = {
  rootDark: {
    marginBottom: 16,
    backgroundColor: " #27293d",
    fontFamily: "'Poppins', sans-serif",
    paddingBottom: 0,
  },
  rootLight: {
    marginBottom: 16,
    backgroundColor: " #fff",
    fontFamily: "'Poppins', sans-serif",
    paddingBottom: 0,
  },
  cardContainerDark: {
    backgroundColor: " #27293d",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 0,
  },
  cardContainerLight: {
    backgroundColor: " #fff",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 0,
  },
  title: {
    fontSize: 14,
    color: "#f4f4f4",
    paddingBottom: 0,
  },
  colorLight: {
    color: "#3b3f51",
  },
};

const useStyles = makeStyles(style);

export default function CardCharts({ title, children, darkMode }) {
  const classes = useStyles();

  return (
    <Card
      className={darkMode ? classes.rootDark : classes.rootLight}
      color="primary"
    >
      <CardContent
        className={
          darkMode ? classes.cardContainerDark : classes.cardContainerLight
        }
      >
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <p className={!darkMode ? classes.colorLight : "title"} style={{fontSize:18}}>{title}</p>
        </Typography>
        <div className={classes.title}>{children}</div>
      </CardContent>
    </Card>
  );
}
