import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import CreateFormCard from '../common/CreateFormCard';
import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';
import EmployeeValueContainer from './EmployeeValueContainer';

export default function CreateEmployeeFormCard(props) {

  const onSubmitCreateEmployee = (employee) => (event) => {
    addEmployee(employee.firstName, employee.lastName, employee.skills, employee.addresses)
    event.preventDefault();
  }

  const addEmployee = async (firstname, lastname, skills, address) => {
    const lambdaEmployeeInput = {
      operation: 'create',
      input: {
        firstname,
        lastname,
        skills: [...skills],
        address,
      }
    }
    await API.graphql(graphqlOperation(mutations.lambdaCreateEmployee, lambdaEmployeeInput));
  }


  return (
    <EmployeeValueContainer>
      { ({ handleChange, employeeValues, address }) => (
        <CreateFormCard
          title='Create an Employee:'
          className={props.className}
          onSubmit={onSubmitCreateEmployee(employeeValues)}
        >
          <EmployeeFormInput
            handleChange={handleChange}
            values={employeeValues}
            addressActions={address}
          />
        </CreateFormCard>
      )}
    </EmployeeValueContainer>
  );
}
