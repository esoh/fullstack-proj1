import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';
import EditFormDialog from '../common/EditFormDialog';

export default function EditEmployeeFormDialog(props) {

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
    };
    await API.graphql(graphqlOperation(mutations.createEmployee, employeeInput))
  }

  function handleSubmit(event){
    addEmployee(values.firstName, values.lastName)
    event.preventDefault();
  }

  return (
    <EditFormDialog open={props.open} onClose={props.onClose} onSubmit={handleSubmit}>
      <EmployeeFormInput handleChange={handleChange}/>
    </EditFormDialog>
  )
}
