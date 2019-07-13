import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function CreateFormCard(props) {
  let {
    title,
    onSubmit,
    children,
    ...outerProps
  } = props;

  const classes = useStyles();

  return (
    <Card {...outerProps}>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={onSubmit}>
        <CardContent>
          <Typography variant="h6">
            {title}
          </Typography>
          {children}
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type='submit'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
