import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import HeaderWithSideMenu from './pageComponents/HeaderWithSideMenu';
import { DRAWER_WIDTH } from './constants/display';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderWithSideMenu
        appName="Employee App"
        drawerItems={['Nothing to see here']}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={drawerOpen}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container maxWidth="sm">
          Hello World!
        </Container>
      </main>
    </div>
  );
}

export default App;
