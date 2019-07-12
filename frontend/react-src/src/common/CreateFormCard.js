import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function CreateFormCard(props) {
  let {
    title,
    ...outerProps
  } = props;

  return (
    <Card {...outerProps}>
      <CardContent>
        <Typography variant="h6">
          {title}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  )
}
