import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function SkillFormInput(props) {

  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      label="Skill Name"
      placeholder="Java"
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      value={props.values.name}
      onChange={props.handleChange('name')}
    />
  )
}
