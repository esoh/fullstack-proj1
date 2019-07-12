import React from 'react';
import { graphqlOperation } from "aws-amplify";
import { Connect } from 'aws-amplify-react';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import ListEmployeesView from './ListEmployeesView';
import CreateEmployeeForm from './CreateEmployeeForm';
import CreateFormCard from '../common/CreateFormCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formCard: {
    marginBottom: theme.spacing(6),
  },
}));

export default function EmployeePage(props){

  const classes = useStyles();

  function onNewEmployee(prev, { onCreateEmployee }){
    var newData = Object.assign({}, prev);
    newData.listEmployees.items.push(onCreateEmployee);
    return newData;
  }

  return (
    <>
      <CreateFormCard title='Create an Employee:' className={classes.formCard}>
        <CreateEmployeeForm/>
      </CreateFormCard>
      <Connect
        query={graphqlOperation(queries.listEmployees, { limit: 1000 })}
        subscription={graphqlOperation(subscriptions.onCreateEmployee)}
        onSubscriptionMsg={onNewEmployee}
      >

        { ({data: { listEmployees }}, loading, error) => {
            if(error) return (<p>Error</p>);
            if(loading || !listEmployees) return (<p>Loading...</p>);
            return (<ListEmployeesView employees={ listEmployees ? listEmployees.items : [] }/>);
          }
        }
      </Connect>
    </>
  );
}
