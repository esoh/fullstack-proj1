import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import CreateFormCard from '../common/CreateFormCard';
import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';

export default function CreateEmployeeFormCard(props) {

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
      className={props.className}
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
