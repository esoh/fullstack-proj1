import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function EditFormDialog(props) {

  const classes = useStyles();

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={props.onSubmit}>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={props.onSave} color="primary">
            Save
          </Button>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
