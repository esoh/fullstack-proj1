import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import CreateFormCard from '../common/CreateFormCard';
import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';

const useStyles = makeStyles(theme => ({
  formCard: {
    marginBottom: theme.spacing(6),
  },
}));

export default function CreateEmployeeFormCard(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleCreateSubmit(event){
    addEmployee(values.firstName, values.lastName)
    event.preventDefault();
  }

  const addEmployee = async (firstname, lastname) => {
    const employeeInput = {
      input: {
        firstname,
        lastname,
      }
    };
    await API.graphql(graphqlOperation(mutations.createEmployee, employeeInput))
  }


  return (
    <CreateFormCard
      title='Create an Employee:'
      className={classes.formCard}
      onSubmit={handleCreateSubmit}
    >
      <EmployeeFormInput
        handleChange={handleChange}
        values={{
          firstName: values.firstName,
          lastName: values.lastName,
        }}
      />
    </CreateFormCard>
  )
}
