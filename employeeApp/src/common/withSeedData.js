import React from 'react';

export default function withSeedData(WrappedComponent, initialData, mapResponseToState){
  return class extends React.Component {
    state = {
      id: null,
      ...initialData
    }

    handleChange = name => event => {
      if(this.state[name] instanceof Set){
        this.setState({
          [name]: new Set(event.target.value)
        })

      } else {
        this.setState({
          [name]: event.target.value
        });
      }
    };

    static getDerivedStateFromProps(props, state){
      if(props.seedData && (!state.id || state.id !== props.seedData.id)) {
        return {
          ...mapResponseToState(props.seedData),
          id: props.seedData.id,
        };
      }
      return state;
    }

    render(){
      return <WrappedComponent {...this.props} handleChange={this.handleChange} values={Object.assign(initialData, this.state)}/>
    }
  }
}
