const gql = require('graphql-tag');

const createEmployee = gql(`mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    id
    firstname
    lastname
    skills
    address {
      line1
      line2
      city
      state
      zipcode
    }
  }
}
`);

const updateEmployee = gql(`mutation UpdateEmployee($input: UpdateEmployeeInput!) {
  updateEmployee(input: $input) {
    id
    firstname
    lastname
    skills
    address {
      line1
      line2
      city
      state
      zipcode
    }
  }
}
`);

const deleteEmployee = gql(`mutation DeleteEmployee($input: DeleteEmployeeInput!) {
  deleteEmployee(input: $input) {
    id
    firstname
    lastname
    skills
    address {
      line1
      line2
      city
      state
      zipcode
    }
  }
}
`);

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee
};
