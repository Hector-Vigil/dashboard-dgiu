import React from 'react';
import './card-charts.styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 16,
    backgroundColor: ' #27293d',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <p className="title">{title}</p>
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}
