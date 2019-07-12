import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
})

export default function TextCard(props){

  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={classes.title}>
          {props.title}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
}
