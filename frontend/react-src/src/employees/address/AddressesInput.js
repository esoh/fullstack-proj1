import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function AddressesInput(props){

  const classes = useStyles();

  function handleClick(event){
    props.addAddress();
  }

  return (
    <Button
      variant='outlined'
      color='primary'
      size='small'
      className={props.className}
      onClick={handleClick}
    >
      <AddIcon className={classes.buttonIcon}/>
      Add Address
    </Button>
  )
}
