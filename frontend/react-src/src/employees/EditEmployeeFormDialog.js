import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import withSeedData from '../common/withSeedData';
import EmployeeFormInput from './EmployeeFormInput';
import EditFormDialog from '../common/EditFormDialog';
import * as mutations from '../graphql/mutations';

function EditEmployeeFormDialog(props) {

  async function updateEmployee(id, firstname, lastname) {
    const employeeInput = {
      input: {
        id,
        firstname,
        lastname,
      }
    };
    await API.graphql(graphqlOperation(mutations.updateEmployee, employeeInput))
  }

  function handleSubmit(event) {
    updateEmployee(props.values.id, props.values.firstName, props.values.lastName)
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
}, function mapResponseToState(employee){
  return {
    firstName: employee.firstname,
    lastName: employee.lastname,
  }
});
