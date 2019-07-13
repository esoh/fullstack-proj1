import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import EmployeeFormInput from './EmployeeFormInput';
import * as mutations from '../graphql/mutations';
import EditFormDialog from '../common/EditFormDialog';

class EditEmployeeFormDialog extends React.Component {

  state = {
    id: null,
    firstName: '',
    lastName: '',
  };

  static getDerivedStateFromProps(props, state){
    if(props.seedEmployee && (!state.id || state.id !== props.seedEmployee.id)) {
      return {
        ...state,
        id: props.seedEmployee.id,
        firstName: props.seedEmployee.firstname,
        lastName: props.seedEmployee.lastname,
        seeded: true,
      };
    }
    return state;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updateEmployee = async (id, firstname, lastname) => {
    const employeeInput = {
      input: {
        id,
        firstname,
        lastname,
      }
    };
    await API.graphql(graphqlOperation(mutations.updateEmployee, employeeInput))
  }

  handleSubmit = event => {
    this.updateEmployee(this.state.id, this.state.firstName, this.state.lastName)
    this.props.onClose();
    event.preventDefault();
  }

  render() {
    return (
      <EditFormDialog
        open={this.props.open}
        onClose={this.props.onClose}
        onSave={this.handleSubmit}
      >
        <EmployeeFormInput
          handleChange={this.handleChange}
          values={{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          }}
        />
      </EditFormDialog>
    )
  }
}

export default EditEmployeeFormDialog;
