import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import EmployeeFormInput from './EmployeeFormInput';
import EditFormDialog from '../common/EditFormDialog';
import * as mutations from '../graphql/mutations';
import EmployeeValueContainer from './EmployeeValueContainer';

export default function EditEmployeeFormDialog(props) {

  async function updateEmployee(id, firstname, lastname, skills, address) {
    const lambdaEmployeeInput = {
      operation: 'update',
      input: {
        id,
        firstname,
        lastname,
        skills,
        address,
      }
    };
    await API.graphql(graphqlOperation(mutations.lambdaUpdateEmployee, lambdaEmployeeInput))
  }

  const onSubmitUpdateEmployee = (employee) => (event) => {
    updateEmployee(employee.id, employee.firstName, employee.lastName, [...employee.skills], employee.addresses)
    props.onClose();
    event.preventDefault();
  }

  return (
    <EmployeeValueContainer seedData={props.seedData}>
      { ({ handleChange, employeeValues, address }) => (
        <EditFormDialog
          title='Edit Employee'
          open={props.open}
          onClose={props.onClose}
          onSave={onSubmitUpdateEmployee(employeeValues)}
        >
          <EmployeeFormInput
            handleChange={handleChange}
            values={employeeValues}
            addressActions={address}
          />
        </EditFormDialog>
      )}
    </EmployeeValueContainer>
  )
}
