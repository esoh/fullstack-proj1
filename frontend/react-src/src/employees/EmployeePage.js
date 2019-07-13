import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import * as queries from '../graphql/queries';
import ListEmployeesView from './ListEmployeesView';
import CreateEmployeeFormCard from './CreateEmployeeFormCard';
import * as mutations from '../graphql/mutations';
import EditEmployeeFormDialog from './EditEmployeeFormDialog';

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

  const [editorOpen, setEditorOpen] = React.useState(false);

  function handleOpenEditor() {
    setEditorOpen(true);
  }

  function handleCloseEditor() {
    setEditorOpen(false);
  }

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

  function onEdit(employee){
    return function (event) {
      console.log('Edit ' + employee.id);
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
      <EditEmployeeFormDialog open={editorOpen} onClose={handleCloseEditor}/>
      <div>
        <CreateEmployeeFormCard />
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
      </div>
    </div>
  );
}
