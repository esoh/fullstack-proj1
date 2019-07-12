import React from 'react';
import { graphqlOperation } from "aws-amplify";
import { Connect } from 'aws-amplify-react';
import * as queries from '../graphql/queries';
import ListEmployeesView from './ListEmployeesView';

export default function EmployeeList(props){
  return (
    <Connect query={graphqlOperation(queries.listEmployees)}>
      { ({data: { listEmployees }}, loading, error) => {
          if(error) return (<p>Error</p>);
          if(loading || !listEmployees) return (<p>Loading...</p>);
          return (<ListEmployeesView employees={ listEmployees ? listEmployees.items : [] }/>);
        }
      }
    </Connect>
  );
}
