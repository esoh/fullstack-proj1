import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import * as queries from '../graphql/queries';
import CreateEmployeeFormCard from './CreateEmployeeFormCard';
import * as mutations from '../graphql/mutations';
import EditEmployeeFormDialog from './EditEmployeeFormDialog';
import EmployeeCard from './EmployeeCard';
import {DataContext} from '../DataContext';


const onChangeEmployee = `subscription OnUpdateEmployee {
  onCreateEmployee {
    id
    firstname
    lastname
    skills
  },
  onDeleteEmployee {
    id
    firstname
    lastname
    skills
  },
  onUpdateEmployee {
    id
    firstname
    lastname
    skills
  }
}
`;

const useStyles = makeStyles(theme => ({
  createCard: {
    marginBottom: theme.spacing(6),
  },
}));

export default function EmployeePage(props){

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editEmployee, setEditEmployee] = React.useState(null);

  const classes = useStyles();

  function handleOpenEditor() {
    setEditorOpen(true);
  }

  function handleCloseEditor() {
    setEditorOpen(false);
  }

  // listen to changes to employees list and apply the update client-side
  function updateEmployees(prev, mutation){
    var newData = Object.assign({}, prev);
    if(mutation.onCreateEmployee){
      newData.listEmployees.items.push(mutation.onCreateEmployee);
    } else if(mutation.onDeleteEmployee){
      newData.listEmployees.items = newData.listEmployees.items.filter(employee => employee.id !== mutation.onDeleteEmployee.id);
    } else if(mutation.onUpdateEmployee){
      for(var i = 0; i < newData.listEmployees.items.length; i++){
        if(newData.listEmployees.items[i].id === mutation.onUpdateEmployee.id){
          Object.assign(newData.listEmployees.items[i], mutation.onUpdateEmployee);
        }
      }
    }
    return newData;
  }

  function onEdit(employee){
    return function (event) {
      setEditEmployee(employee)
      handleOpenEditor();
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
    <div>
      <EditEmployeeFormDialog
        open={editorOpen}
        onClose={handleCloseEditor}
        seedData={editEmployee}
      />
      <div>
        <CreateEmployeeFormCard className={classes.createCard}/>
        <Connect
          query={graphqlOperation(queries.listEmployees, { limit: 1000 })}
          subscription={graphqlOperation(onChangeEmployee)}
          onSubscriptionMsg={updateEmployees}
        >
          { ({data: { listEmployees }}, loading, error) => {
              if(error) return (<p>Error</p>);
              if(loading || !listEmployees) return (<p>Loading...</p>);
              return (
                <Grid
                  container
                  spacing={2}
                >
                  <DataContext.Consumer>
                    { ({ skills: { loading, error, idToName } }) => {
                      if(error) return <p>Error</p>;
                      if(loading || !idToName) return <p>Loading</p>;

                      return (listEmployees) ? listEmployees.items.map(employee =>
                        <EmployeeCard
                          key={employee.id}
                          employee={employee}
                          skillIdToName={idToName}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      ) : null;
                    }}
                  </DataContext.Consumer>
                </Grid>
              );
            }
          }
        </Connect>
      </div>
    </div>
  );
}
