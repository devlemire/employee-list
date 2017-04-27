import React, { Component } from 'react';
import './EmployeeList.css';

class EmployeeList extends Component {
  render() {
    return (
      <div id="list-container">
        <ul>
          { 
            // Map over this.props.employees
          }
        </ul>
      </div>
    )
  }
}

export default EmployeeList;