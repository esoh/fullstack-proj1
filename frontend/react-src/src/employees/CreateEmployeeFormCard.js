import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import CreateFormCard from '../common/CreateFormCard';
import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';

export default function CreateEmployeeFormCard(props) {

  const textFields = {
    firstName: '',
    lastName: '',
  }

  const [values, setValues] = React.useState({
    ...textFields,
    skills: new Set(),
  });

  const handleChange = name => event => {
    if(textFields.hasOwnProperty(name)){
      setValues({ ...values, [name]: event.target.value });
    } else if(name === 'skills'){
      setValues({ ...values, skills: new Set(event.target.value) })
    }
  };

  function handleCreateSubmit(event){
    addEmployee(values.firstName, values.lastName, values.skills)
    event.preventDefault();
  }

  const addEmployee = async (firstname, lastname, skills) => {
    const employeeInput = {
      input: {
        firstname,
        lastname,
        skills: [...skills]
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
          skills: values.skills
        }}
      />
    </CreateFormCard>
  )
}
