import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EditSkillFormDialog from './EditSkillFormDialog';
import CreateSkillFormCard from './CreateSkillFormCard';
import Grid from '@material-ui/core/Grid';
import TextCard from '../common/TextCard';
import {DataContext} from '../DataContext';

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
        <DataContext.Consumer>
          {({ skills: { list, loading, error } }) => {
            if(error) return (<p>Error</p>);
            if(loading || !list) return (<p>Loading...</p>);
            return (
              <Grid
                container
                spacing={2}
              >
                {(list) ? list.items.map(displaySkill) : null}
              </Grid>
            );
          }}
        </DataContext.Consumer>
      </div>
    </div>
  );
}
