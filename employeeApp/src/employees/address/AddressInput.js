import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
  },
  show: {
    visibility: 'visible',
    opacity: 1,
    transition: 'visibility 0s linear 0ms, opacity 300ms',
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear 300ms, opacity 300ms',
  },
  horizontalContainer: {
    display: 'flex',
  },
  horizontalItem: {
    flexGrow: 1,
  },
  hasLeft: {
    marginLeft: theme.spacing(1),
  },
  hasRight: {
    marginRight: theme.spacing(1)
  },
}))

export default function AddressInput(props) {

  const [itemsVisible, setItemsVisible] = React.useState(false);

  const classes = useStyles();

  function showItems() {
    setItemsVisible(true);
  }

  function hideItems() {
    setItemsVisible(false);
  }

  return (
    <div onMouseOver={showItems} onMouseEnter={showItems} onMouseLeave={hideItems}>
      <Typography>{'Address ' + props.normalIndex}</Typography>
      <TextField
        className={classes.textField}
        label="Address Line 1"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="1234 Main St."
        value={props.value.line1}
        margin="normal"
        onChange={props.onChange('line1')}
      />
      <TextField
        className={classes.textField}
        label="Address Line 2"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Apartment 1234"
        value={props.value.line2}
        margin="normal"
        onChange={props.onChange('line2')}
      />
      <div className={classes.horizontalContainer}>
        <TextField
          className={clsx(classes.textField, classes.horizontalItem, classes.hasRight)}
          label="City"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Los Angeles"
          value={props.value.city}
          margin="normal"
          onChange={props.onChange('city')}
        />
        <TextField
          className={clsx(classes.textField, classes.horizontalItem, classes.hasRight, classes.hasLeft)}
          label="State"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="CA"
          value={props.value.state}
          margin="normal"
          onChange={props.onChange('state')}
        />
        <TextField
          className={clsx(classes.textField, classes.horizontalItem, classes.hasLeft)}
          label="Zip Code"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="12345"
          value={props.value.zipcode}
          margin="normal"
          onChange={props.onChange('zipcode')}
        />
      </div>

      {(!!props.onDelete) ? (
        <Button
          size="small"
          color="primary"
          onClick={props.onDelete}
          className={clsx({
            [classes.show]: itemsVisible,
            [classes.hide]: !itemsVisible,
          })}
        >
          Remove Address
        </Button>
      ): null}
    </div>
  )
}
