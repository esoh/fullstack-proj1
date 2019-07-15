// eslint-disable
// this is an auto generated file. This will be overwritten

export const createEmployee = `mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    id
    firstname
    lastname
    skills
  }
}
`;
export const updateEmployee = `mutation UpdateEmployee($input: UpdateEmployeeInput!) {
  updateEmployee(input: $input) {
    id
    firstname
    lastname
    skills
  }
}
`;
export const deleteEmployee = `mutation DeleteEmployee($input: DeleteEmployeeInput!) {
  deleteEmployee(input: $input) {
    id
    firstname
    lastname
    skills
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
