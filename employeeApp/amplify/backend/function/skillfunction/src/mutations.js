const gql = require('graphql-tag');

const createSkill = gql(`mutation CreateSkill($input: CreateSkillInput!) {
  createSkill(input: $input) {
    id
    name
  }
}
`);
const updateSkill = gql(`mutation UpdateSkill($input: UpdateSkillInput!) {
  updateSkill(input: $input) {
    id
    name
  }
}
`);
const deleteSkill = gql(`mutation DeleteSkill($input: DeleteSkillInput!) {
  deleteSkill(input: $input) {
    id
    name
  }
}
`);

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill
};
