import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextCard from '../common/TextCard';

export default function EmployeeCard(props){

  let {
    employee,
    skillIdToName,
    onEdit,
    onDelete,
  } = props;

  let skillText = (employee.skills.length > 0) ? "Skills: " + employee.skills.map(id => skillIdToName.get(id)).join(', ') : "Skills: None";
  let addressToText = (address, index) =>
    'Address ' + (index+1) + ': ' + address.line1 + ' ' + address.line2 + ', ' + address.city + ' ' + address.state + ' ' + address.zipcode;

  return (
    <Grid item xs={12}>
      <TextCard
        title={employee.lastname + ', ' + employee.firstname}
        onEdit={onEdit(employee)}
        onDelete={onDelete(employee.id)}
      >
        <Typography variant="body2">{skillText}</Typography>
        {employee.address.map((address, index) =>
          <Typography variant="body2" key={address}>{addressToText(address, index)}</Typography>
        )}
      </TextCard>
    </Grid>
  );
}
