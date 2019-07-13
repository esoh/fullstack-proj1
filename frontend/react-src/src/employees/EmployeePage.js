import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';

import * as queries from '../graphql/queries';
import ListEmployeesView from './ListEmployeesView';
import CreateEmployeeForm from './CreateEmployeeForm';
import CreateFormCard from '../common/CreateFormCard';
import * as mutations from '../graphql/mutations';

const useStyles = makeStyles(theme => ({
  formCard: {
    marginBottom: theme.spacing(6),
  },
}));

const onChangeEmployee = `subscription OnUpdateEmployee {
  onCreateEmployee {
    id
    firstname
    lastname
  },
  onDeleteEmployee {
    id
    firstname
    lastname
  },
  onUpdateEmployee {
    id
    firstname
    lastname
  }
}
`;

export default function EmployeePage(props){

  const classes = useStyles();

  function updateEmployees(prev, mutation){
    var newData = Object.assign({}, prev);
    if(mutation.onCreateEmployee){
      newData.listEmployees.items.push(mutation.onCreateEmployee);
    } else if(mutation.onDeleteEmployee){
      newData.listEmployees.items = newData.listEmployees.items.filter(employee => employee.id !== mutation.onDeleteEmployee.id);
    } /* else if(mutation.onUpdateEmployee){
      for(var employee in newData.listEmployees.items){
        if(employee.id === mutation.onUpdateEmployee.id){
          employee = mutation.onUpdateEmployee;
        }
      }
    }*/
    return newData;
  }

  function onEdit(employeeId){
    return function (event) {
      console.log('Edit ' + employeeId);
    }
  }

  function onDelete(employeeId){
    return async function (event) {
      const employeeInput = {
        input: {
          id: employeeId
        }
      };
      await API.graphql(graphqlOperation(mutations.deleteEmployee, employeeInput))
    }
  }

  return (
    <>
      <CreateFormCard title='Create an Employee:' className={classes.formCard}>
        <CreateEmployeeForm/>
      </CreateFormCard>
      <Connect
        query={graphqlOperation(queries.listEmployees, { limit: 1000 })}
        subscription={graphqlOperation(onChangeEmployee)}
        onSubscriptionMsg={updateEmployees}
      >

        { ({data: { listEmployees }}, loading, error) => {
            if(error) return (<p>Error</p>);
            if(loading || !listEmployees) return (<p>Loading...</p>);
            return (
              <ListEmployeesView
                employees={ listEmployees ? listEmployees.items : [] }
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          }
        }
      </Connect>
    </>
  );
}
