import React from 'react';
import { graphqlOperation }  from "aws-amplify";
import { Connect } from 'aws-amplify-react';
import * as queries from '../graphql/queries';

export default function EmployeeList(props){
  return (
    <Connect query={graphqlOperation(queries.listEmployees)}>
      { ({data: { listEmployees }}, loading, error) => {
          if(error) return (<p>Error</p>);
          if(loading || !listEmployees) return (<p>Loading...</p>);
          console.log(listEmployees.items);
          return null;
        }
      }
    </Connect>
  );
}
