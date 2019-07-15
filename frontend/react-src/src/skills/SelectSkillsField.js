import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import {DataContext} from '../DataContext';

export default function SelectSkillsField(props){

  if(!props.values.length){
    return <Typography variant='body2' className={props.className}>No skills found.<br></br><Link to='/skills'>Create a Skill »</Link></Typography>
  }

  return (
    <DataContext.Consumer>
      {({ skills: { list, loading, error, idToName } }) => {
        if(error) return (<p>Error</p>);
        if(loading || !list) return (<p>Loading...</p>);
        return (
          <FormControl className={props.className}>
            <InputLabel shrink>Skills</InputLabel>
            <Select
              multiple
              value={[...props.values]}
              renderValue={selected => selected.map(id => idToName.get(id)).join(', ')}
              onChange={props.onChange}
            >
              {list.items.map(skill => (
                <MenuItem key={skill.id} value={skill.id}>
                  <Checkbox checked={props.values.has(skill.id)} />
                  <ListItemText primary={skill.name}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    </DataContext.Consumer>
  )
}
