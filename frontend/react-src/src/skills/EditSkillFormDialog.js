import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import withSeedData from '../common/withSeedData';
import EditFormDialog from '../common/EditFormDialog';
import SkillFormInput from './SkillFormInput';
import * as mutations from '../graphql/mutations';

function EditSkillFormDialog(props) {

  async function updateSkill(id, name) {
    const skillInput = {
      input: {
        id,
        name,
      }
    };
    await API.graphql(graphqlOperation(mutations.updateSkill, skillInput))
  }

  function handleSubmit(event) {
    updateSkill(props.values.id, props.values.name)
    props.onClose();
    event.preventDefault();
  }

  return (
    <EditFormDialog
      title='Edit Skill'
      open={props.open}
      onClose={props.onClose}
      onSave={handleSubmit}
    >
      <SkillFormInput
        handleChange={props.handleChange}
        values={props.values}
      />
    </EditFormDialog>
  )
}

export default withSeedData(EditSkillFormDialog, {
  name: '',
}, function mapResponseToState(skill){
  return {
    name: skill.name,
  }
});
