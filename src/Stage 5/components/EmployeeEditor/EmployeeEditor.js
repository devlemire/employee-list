import React, { Component } from 'react';
import './EmployeeEditor.css';

class EmployeeEditor extends Component {
  componentWillReceiveProps(props) {
    this.setState({ employee: props.selected, originalEmployee: props.selected, notModified: true });
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
            <input value={ this.state.employee.name }></input>
            <p> Phone </p>
            <input value={ this.state.employee.phone }></input>
            <p> Title </p>
            <input value={ this.state.employee.title }></input>

            <br />
            <br />
            <button disabled={this.state.notModified}> Save </button>
            <button disabled={this.state.notModified}> Cancel </button>
          </div>
          :
          <p> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;