import React from 'react';
import TextField from '@material-ui/core/TextField';
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function EmployeeFormInput(props) {

  const classes = useStyles();

  return (
    <div>
      <div className={classes.horizontalContainer}>
        <TextField
          className={clsx(classes.textField, classes.horizontalItem)}
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
          className={clsx(classes.textField, classes.horizontalItem)}
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
        className={classes.textField}
        values={props.values.skills}
        onChange={props.handleChange('skills')}
      />
    </div>
  )
}
