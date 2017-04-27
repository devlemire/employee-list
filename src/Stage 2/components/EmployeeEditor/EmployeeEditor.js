import React, { Component } from 'react';
import './EmployeeEditor.css';

import '../../models/Employee';

class EmployeeEditor extends Component {
  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true
    };
  }

  // componentWillReceiveProps

  handleChange(prop, val) {
    if ( this.state.notModified ) {
      this.setState({ notModified: false });
    }

    var employee = this.state.employee;
    employee[prop] = val;
    this.setState({ employee: employee });
  }

  save() {
    this.state.originalEmployee.updateName(this.state.employee.name);
    this.state.originalEmployee.updatePhone(this.state.employee.phone);
    this.state.originalEmployee.updateTitle(this.state.employee.title);
    this.setState({ notModified: true });
    this.props.refreshList();
  }

  cancel() {
    this.setState({ employee: this.state.originalEmployee });
  }

  render() {
    return (
      <div id="editor-container">
        { 
          this.state.employee
          ? 
          <div id="employee-card">
            <p> Employee ID: { this.state.employee.id } </p>
            <p> Name </p>
            <input value={ this.state.employee.name } onChange={ (e) => { this.handleChange('name', e.target.value) } }></input>
            <p> Phone </p>
            <input value={ this.state.employee.phone } onChange={ (e) => { this.handleChange('phone', e.target.value) } }></input>
            <p> Title </p>
            <input value={ this.state.employee.title } onChange={ (e) => { this.handleChange('title', e.target.value) } }></input>

            <br />
            <br />
            <button disabled={this.state.notModified} onClick={ this.save }> Save </button>
            <button disabled={this.state.notModified} onClick={ this.cancel }> Cancel </button>
          </div>
          :
          <p> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;