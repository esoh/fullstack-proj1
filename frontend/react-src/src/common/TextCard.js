import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  show: {
    visibility: 'visible',
    opacity: 1,
    transition: 'visibility 0s linear 0ms, opacity 300ms',
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear 300ms, opacity 300ms',
  }
})

export default function TextCard(props){
  const [itemsVisible, setItemsVisible] = React.useState(false);

  const classes = useStyles();

  function showItems() {
    setItemsVisible(true);
  }

  function hideItems() {
    setItemsVisible(false);
  }

  return (
    <Card onMouseOver={showItems} onMouseEnter={showItems} onMouseLeave={hideItems}>
      <CardContent>
        <Typography className={classes.title}>
          {props.title}
        </Typography>
        {props.children}
      </CardContent>

      {(!!props.onEdit || !!props.onDelete) ? (
        <CardActions className={clsx({
          [classes.show]: itemsVisible,
          [classes.hide]: !itemsVisible,
        })}>
        {(!!props.onEdit) ? (
            <Button size="small" color="primary" onClick={props.onEdit}>
              Edit
            </Button>
        ) : null}
        {(!!props.onDelete) ? (
          <Button size="small" color="primary" onClick={props.onDelete}>
            Delete
          </Button>
        ) : null}
        </CardActions>
      ): null}
    </Card>
  );
}
