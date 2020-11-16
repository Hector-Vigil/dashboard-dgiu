import React from 'react';
import './card-charts.styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginBottom: 16,
    backgroundColor: ' #27293d',
    width: '80%',
    height: '100%',
  },
  cardContainer: {
    marginBottom: 16,
    backgroundColor: ' #27293d',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: '#f4f4f4',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardCharts({ title, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} color="primary">
      <CardContent className={classes.cardContainer}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <p className="title">{title}</p>
        </Typography>
        <div className={classes.title}>{children}</div>
      </CardContent>
    </Card>
  );
}
