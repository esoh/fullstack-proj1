import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import AddressInput from './AddressInput';

const useStyles = makeStyles(theme => ({
  buttonIcon: {
    marginRight: theme.spacing(0.5),
  },
  iconSmall: {
    fontSize: 20,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  addressesTop: {
    marginTop: theme.spacing(6),
  },
}))

export default function AddressesInput(props){

  const classes = useStyles();

  function handleClick(event){
    props.addressActions.add();
  }

  const onDeleteIndex = (addressIndex) => (event) => {
    props.addressActions.delete(addressIndex);
  }

  const onChangeIndex = (addressIndex) => props.addressActions.handleChange(addressIndex);

  return (
    <div>
      {(props.values.length > 0) ? (
        <div className={classes.addressesTop}>
          {props.values.map((address, index) =>
            <div key={index}>
              <Divider className={classes.divider}/>
              <AddressInput
                normalIndex={index + 1}
                value={props.values[index]}
                onChange={onChangeIndex(index)}
                onDelete={onDeleteIndex(index)}
              />
            </div>
          ).concat(<Divider className={classes.divider} key='bottom'/>)}
        </div>
        ) : null
      }
      <Button
        variant='outlined'
        color='primary'
        size='small'
        className={props.className}
        onClick={handleClick}
      >
        <AddIcon className={clsx(classes.buttonIcon, classes.iconSmall)}/>
        Add New Address
      </Button>
    </div>
  )
}
