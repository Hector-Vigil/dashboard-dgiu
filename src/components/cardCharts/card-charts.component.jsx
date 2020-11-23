import React from "react";
import "./card-charts.styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

let style = {
  root: {
    marginBottom: 16,
    backgroundColor: " #27293d",
    height: "100%",
    paddingBottom: 0,
  },
  cardContainer: {
    backgroundColor: " #27293d",
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
};

const useStyles = makeStyles(style);

export default function CardCharts({ title, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} color="primary">
      <CardContent className={classes.cardContainer}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <p className="title">{title}</p>
        </Typography>
        <div className={classes.title}>{children}</div>
      </CardContent>
    </Card>
  );
}
