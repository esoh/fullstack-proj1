import React from 'react';

export default class EmployeeValueContainer extends React.Component {
  state = {
    id: null,
    firstName: '',
    lastName: '',
    skills: new Set(),
    addresses: [],
  }

  blankAddress = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipcode: '',
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
      addresses: ((employeeData['address']) ? employeeData.address : []),
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

  addAddress = () => {
    let addresses = this.state.addresses;
    addresses.push({...this.blankAddress});
    this.setState({ addresses });
  }

  deleteAddress = index => {
    let addresses = this.state.addresses;
    addresses.splice(index, 1);
    this.setState({ addresses });
  }

  addressIndexHandleChange = index => name => event => {
    let value = event.target.value;
    let addresses = this.state.addresses;
    addresses[index][name] = value;
    this.setState({ addresses });
  }

  render() {
    return this.props.children({
      handleChange: this.handleChange,
      employeeValues: this.state,
      address: {
        add: this.addAddress,
        delete: this.deleteAddress,
        handleChange: this.addressIndexHandleChange,
      }
    })
  }
}
