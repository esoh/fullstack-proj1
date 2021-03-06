import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import DataContextProvider from './DataContextProvider';
import EmployeePage from './employees/EmployeePage';
import SkillPage from './skills/SkillPage';
import HeaderWithSideMenu from './pageComponents/HeaderWithSideMenu';
import { DRAWER_WIDTH } from './constants/display';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

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

function App(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <HeaderWithSideMenu
          appName="Employee App"
          drawerItems={{
            'Employees': '/employees',
            'Skills': '/skills',
          }}
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
            <DataContextProvider>
              <Switch>
                <Route path='/employees' component={EmployeePage}/>
                <Route path='/skills' component={SkillPage}/>
                <Route render={() => <Redirect to="/employees" />} />
              </Switch>
            </DataContextProvider>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;
