import React, { Component } from 'react';
import './EmployeeEditor.css';

class EmployeeEditor extends Component {

  componentWillReceiveProps(props) {
    // console.log('Component Will Receive Props', props);
    this.setState({ employee: props.selected, originalEmployee: props.selected });
  }

  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true
    };
  }

  handleChange(prop, val) {
    // console.log(prop, val);
    if ( this.state.notModified ) {
      this.setState({ notModified: false });
    }

    var employee = Object.assign({}, this.state.employee);
    employee[prop] = val;
    this.setState({ employee: employee });
  }

  save() {
    this.state.employee.updateName('test');
    this.state.employee.updateVersion();
  }

  cancel() {
    this.setState({ employee: this.state.originalEmployee });
  }

  render() {
    console.log('Employee:', this.state.employee);
    return (
      <div id="editor-container">
        <div id="employee-card">
          <p> Employee ID: # </p>
          <p> Name </p>
          <input value={this.state.employee ? this.state.employee.name : ''} onChange={ (e) => { this.handleChange('name', e.target.value) } }></input>
          <p> Phone </p>
          <input value={this.state.employee ? this.state.employee.phone : ''}></input>
          <p> Title </p>
          <input value={this.state.employee ? this.state.employee.title : ''}></input>

          <br />
          <br />
          <button disabled={this.state.notModified} onClick={ this.save.bind(this) }> Save </button>
          <button disabled={this.state.notModified} onClick={ this.cancel.bind(this) }> Cancel </button>
        </div>
      </div>
    )
  }
}

export default EmployeeEditor;