import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import CreateFormCard from '../common/CreateFormCard';
import * as mutations from '../graphql/mutations';
import SkillFormInput from './SkillFormInput';

export default function CreateSkillFormCard(props) {

  const [values, setValues] = React.useState({
    name: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleCreateSubmit(event){
    addSkill(values.name)
    event.preventDefault();
  }

  const addSkill = async (name) => {
    const lambdaSkillInput = {
      operation: 'create',
      input: {
        name,
      }
    };
    await API.graphql(graphqlOperation(mutations.lambdaCreateSkill, lambdaSkillInput))
  }

  return (
    <CreateFormCard
      title='Create a Skill: '
      className={props.className}
      onSubmit={handleCreateSubmit}
    >
      <SkillFormInput
        handleChange={handleChange}
        values={{
          name: values.name,
        }}
      />
    </CreateFormCard>
  )
}
