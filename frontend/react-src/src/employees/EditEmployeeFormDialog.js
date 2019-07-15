import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import withSeedData from '../common/withSeedData';
import EmployeeFormInput from './EmployeeFormInput';
import EditFormDialog from '../common/EditFormDialog';
import * as mutations from '../graphql/mutations';

function EditEmployeeFormDialog(props) {

  async function updateEmployee(id, firstname, lastname, skills) {
    const employeeInput = {
      input: {
        id,
        firstname,
        lastname,
        skills,
      }
    };
    await API.graphql(graphqlOperation(mutations.updateEmployee, employeeInput))
  }

  function handleSubmit(event) {
    updateEmployee(props.values.id, props.values.firstName, props.values.lastName, [...props.values.skills])
    props.onClose();
    event.preventDefault();
  }

  return (
    <EditFormDialog
      title='Edit Employee'
      open={props.open}
      onClose={props.onClose}
      onSave={handleSubmit}
    >
      <EmployeeFormInput
        handleChange={props.handleChange}
        values={props.values}
      />
    </EditFormDialog>
  )
}

export default withSeedData(EditEmployeeFormDialog, {
  firstName: '',
  lastName: '',
  skills: new Set(),
}, function mapResponseToState(employee){
  return {
    firstName: employee.firstname,
    lastName: employee.lastname,
    skills: new Set(employee.skills),
  }
});
