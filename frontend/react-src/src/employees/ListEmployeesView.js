import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextCard from '../common/TextCard';

export default function ListEmployeesView(props){
  return (
    <Grid
      container
      spacing={2}
    >
      {props.employees.map(employee => (
          <Grid item key={employee.id} xs={12}>
            <TextCard
              title={employee.lastname + ', ' + employee.firstname}
              key={employee.id}
              onEdit={props.onEdit(employee.id)}
              onDelete={props.onDelete(employee.id)}
            >
            </TextCard>
          </Grid>
      ))}
    </Grid>
  );

}
