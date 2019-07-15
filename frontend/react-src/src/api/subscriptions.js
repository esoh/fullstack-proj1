export const onChangeSkill = `subscription OnChangeSkill {
  onCreateSkill {
    id
    name
  },
  onUpdateSkill {
    id
    name
  }
}
`;

export * from '../graphql/subscriptions';
