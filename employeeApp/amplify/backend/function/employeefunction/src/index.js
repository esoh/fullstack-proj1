/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiEmployeeAppApiGraphQLAPIIdOutput = process.env.API_EMPLOYEEAPPAPI_GRAPHQLAPIIDOUTPUT
var apiEmployeeAppApiGraphQLAPIEndpointOutput = process.env.API_EMPLOYEEAPPAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
global.WebSocket = require('ws');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const region = process.env.REGION;
const endpoint = process.env.API_EMPLOYEEAPPAPI_GRAPHQLAPIENDPOINTOUTPUT;
const appsyncApiKey = process.env.API_EMPLOYEEAPPAPI_GRAPHQLAPIKEYOUTPUT;

const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

const AWSAppSyncClient = require('aws-appsync').default;

const client = new AWSAppSyncClient({
  url: endpoint,
  region: region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: appsyncApiKey,
  },
  disableOffline: true
});

const mutations = require('./mutations');

exports.handler = async function (event, context) { //eslint-disable-line

  var {
    operation,
    input
  } = event.arguments;

  var mutation;
  switch(operation){
    case 'create':
      mutation = mutations.createEmployee;

      if(input['address'] && input.address.length > 0){
        for(var i = 0; i < input.address.length; i++){
          if(input.address[i].line2 === ''){
            delete input.address[i].line2
          }
        }
      }
      break;
    case 'update':
      mutation = mutations.updateEmployee;

      if(input['address'] && input.address.length > 0){
        for(var i = 0; i < input.address.length; i++){
          if(input.address[i].line2 === ''){
            delete input.address[i].line2
          }
        }
      }
      break;
    case 'delete':
      mutation = mutations.deleteEmployee;
      break;
    default:
      return context.done('Unknown operation: ${operation}');
  }

  let retval = await client.mutate({ mutation, variables: { input }});
  console.log(retval);
  context.done(null, retval);
};
