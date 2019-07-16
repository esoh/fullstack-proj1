import React from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import * as queries from './graphql/queries';
import * as subscriptions from './api/subscriptions';

import {DataContext} from './DataContext';

export default function DataContextProvider(props) {

  function updateSkills(prev, mutation){
    var newData = Object.assign({}, prev);
    if(mutation.onCreateSkill){
      newData.listSkills.items.unshift(mutation.onCreateSkill);
    } else if(mutation.onUpdateSkill){
      for(var i = 0; i < newData.listSkills.items.length; i++){
        if(newData.listSkills.items[i].id === mutation.onUpdateSkill.id){
          Object.assign(newData.listSkills.items[i], mutation.onUpdateSkill);
        }
      }
    }
    return newData;
  }

  return (
    <Connect
      query={graphqlOperation(queries.listSkills, { limit: 1000 })}
      subscription={graphqlOperation(subscriptions.onChangeSkill)}
      onSubscriptionMsg={updateSkills}
    >
      { ({data: { listSkills }}, loading, error) => {
        return (
          <DataContext.Provider value={{
            skills: {
              list: listSkills,
              loading,
              error,
              idToName: (listSkills) ? new Map(listSkills.items.map(skill => [skill.id, skill.name])) : null,
            }
          }}>
            {props.children}
          </DataContext.Provider>
        )
      }}
    </Connect>
  );
}
