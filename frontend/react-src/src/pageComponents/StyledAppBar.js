import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants/display';

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}))

export default function StyledAppBar(props) {

  const classes = useStyles();

  return (
    <header className="App-header">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src="https://material-ui.com/static/images/material-ui-logo.svg" alt="Kitten" height="25" width="25"/>
          <Typography variant="h6" noWrap className={classes.title}>
            {props.appName}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};
