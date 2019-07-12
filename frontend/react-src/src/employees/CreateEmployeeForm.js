import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import * as mutations from '../graphql/mutations';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
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

export default function CreateEmployeeForm(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addEmployee = async (firstname, lastname) => {
    const employeeInput = {
      input: {
        firstname,
        lastname,
      }
    }
    await API.graphql(graphqlOperation(mutations.createEmployee, employeeInput))
  }

  function handleSubmit(event){
    addEmployee(values.firstName, values.lastName)
    event.preventDefault();
  }

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className={classes.horizontalContainer}>
        <TextField
          className={clsx(classes.textField, classes.horizontalItem)}
          label="First Name"
          placeholder="John"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('firstName')}
        />
        <TextField
          className={clsx(classes.textField, classes.horizontalItem)}
          label="Last Name"
          placeholder="Doe"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('lastName')}
        />
      </div>
      <Button variant="contained" color="primary" className={classes.button} type='submit'>
        Submit
      </Button>
    </form>
  )
}
