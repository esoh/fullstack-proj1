import React from 'react';

export default class EmployeeValueContainer extends React.Component {
  state = {
    id: null,
    firstName: '',
    lastName: '',
    skills: new Set(),
    addresses: [],
  }

  static getDerivedStateFromProps(props, state){
    if(props.seedData && (!state.id || state.id !== props.seedData.id)) {
      return {
        ...EmployeeValueContainer.mapEmployeeToState(props.seedData),
        id: props.seedData.id,
      };
    }
    return state;
  }

  static mapEmployeeToState(employeeData){
    return {
      firstName: employeeData.firstname,
      lastName: employeeData.lastname,
      skills: ((employeeData['skills']) ? new Set(employeeData.skills) : new Set()),
      address: ((employeeData['address']) ? employeeData.address : []),
    };
  }

  handleChange = name => event => {
    let value = event.target.value;
    switch(name){
      case 'firstName':
        this.setState({ firstName: value });
        break;
      case 'lastName':
        this.setState({ lastName: value });
        break;
      case 'skills':
        this.setState({ skills: new Set(value) })
        break;
      default:
        console.error("target name " + name + " not found");
    }
  }

  render() {
    return this.props.children({
      handleChange: this.handleChange,
      employeeValues: this.state,
    })
  }
}
