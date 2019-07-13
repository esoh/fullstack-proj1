import React from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';

import EditSkillFormDialog from './EditSkillFormDialog';
import CreateSkillFormCard from './CreateSkillFormCard';
import Grid from '@material-ui/core/Grid';
import TextCard from '../common/TextCard';
import * as queries from '../graphql/queries';

const onChangeSkill = `subscription OnUpdateSkill {
  onCreateSkill {
    id
    name
  },
  onUpdateSkill {
    id
    name
  }
}
`;

const useStyles = makeStyles(theme => ({
  createCard: {
    marginBottom: theme.spacing(6),
  },
}));

export default function SkillPage(props){

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const classes = useStyles();

  function handleOpenEditor() {
    setEditorOpen(true);
  }

  function handleCloseEditor() {
    setEditorOpen(false);
  }

  function onEdit(skill){
    return function (event) {
      setEditData(skill)
      handleOpenEditor();
    }
  }

  // listen to changes to skills list and apply the update client-side
  function updateSkills(prev, mutation){
    var newData = Object.assign({}, prev);
    if(mutation.onCreateSkill){
      newData.listSkills.items.push(mutation.onCreateSkill);
    } else if(mutation.onUpdateSkill){
      for(var i = 0; i < newData.listSkills.items.length; i++){
        if(newData.listSkills.items[i].id === mutation.onUpdateSkill.id){
          Object.assign(newData.listSkills.items[i], mutation.onUpdateSkill);
        }
      }
    }
    return newData;
  }

  function displaySkill(skill){
    return (
      <Grid item key={skill.id} xs={12}>
        <TextCard
          title={skill.name}
          key={skill.id}
          onEdit={onEdit(skill)}
        >
        </TextCard>
      </Grid>
    )
  }

  return (
    <div>
      <EditSkillFormDialog
        open={editorOpen}
        onClose={handleCloseEditor}
        onSave={props.handleOnEdit}
        seedData={editData}
      />
      <div>
        <CreateSkillFormCard className={classes.createCard}/>
        <Connect
          query={graphqlOperation(queries.listSkills, { limit: 1000 })}
          subscription={graphqlOperation(onChangeSkill)}
          onSubscriptionMsg={updateSkills}
        >
          { ({data: { listSkills }}, loading, error) => {
              if(error) return (<p>Error</p>);
              if(loading || !listSkills) return (<p>Loading...</p>);
              return (
                <Grid
                  container
                  spacing={2}
                >
                  {(listSkills) ? listSkills.items.map(displaySkill) : null}
                </Grid>
              );
            }
          }
        </Connect>
      </div>
    </div>
  );
}
