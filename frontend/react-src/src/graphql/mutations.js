// eslint-disable
// this is an auto generated file. This will be overwritten

export const lambdaCreateSkill = `mutation LambdaCreateSkill(
  $operation: String!
  $input: LambdaCreateSkillInput!
) {
  lambdaCreateSkill(operation: $operation, input: $input)
}
`;
export const lambdaUpdateSkill = `mutation LambdaUpdateSkill(
  $operation: String!
  $input: LambdaUpdateSkillInput!
) {
  lambdaUpdateSkill(operation: $operation, input: $input)
}
`;
export const lambdaDeleteSkill = `mutation LambdaDeleteSkill(
  $operation: String!
  $input: LambdaDeleteSkillInput!
) {
  lambdaDeleteSkill(operation: $operation, input: $input)
}
`;
export const createEmployee = `mutation CreateEmployee($input: CreateEmployeeInput!) {
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
`;
export const updateEmployee = `mutation UpdateEmployee($input: UpdateEmployeeInput!) {
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
`;
export const deleteEmployee = `mutation DeleteEmployee($input: DeleteEmployeeInput!) {
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
`;
export const createSkill = `mutation CreateSkill($input: CreateSkillInput!) {
  createSkill(input: $input) {
    id
    name
  }
}
`;
export const updateSkill = `mutation UpdateSkill($input: UpdateSkillInput!) {
  updateSkill(input: $input) {
    id
    name
  }
}
`;
export const deleteSkill = `mutation DeleteSkill($input: DeleteSkillInput!) {
  deleteSkill(input: $input) {
    id
    name
  }
}
`;
