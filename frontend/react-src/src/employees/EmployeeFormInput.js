import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddressesInput from './address/AddressesInput';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import SelectSkillsField from '../skills/SelectSkillsField';

const useStyles = makeStyles(theme => ({
  horizontalContainer: {
    display: 'flex',
  },
  horizontalItem: {
    flexGrow: 1,
  },
  hasLeft: {
    marginLeft: theme.spacing(1),
  },
  hasRight: {
    marginRight: theme.spacing(1)
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'block',
  },
  addAddressButton: {
    marginTop: theme.spacing(2),
  }
}));

export default function EmployeeFormInput(props) {

  const classes = useStyles();

  return (
    <div>
      <div className={classes.horizontalContainer}>
        <TextField
          className={clsx(classes.hasRight, classes.horizontalItem)}
          label="First Name"
          placeholder="John"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.values.firstName}
          onChange={props.handleChange('firstName')}
        />
        <TextField
          className={clsx(classes.hasLeft, classes.horizontalItem)}
          label="Last Name"
          placeholder="Doe"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.values.lastName}
          onChange={props.handleChange('lastName')}
        />
      </div>
      <SelectSkillsField
        className={classes.row}
        values={props.values.skills}
        onChange={props.handleChange('skills')}
      />
      <AddressesInput
        className={classes.addAddressButton}
        values={props.values.addresses}
        onChange={props.handleChange('addresses')}
        addressActions={props.addressActions}
      />
    </div>
  )
}
