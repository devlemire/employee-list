import React, { Component } from 'react';
import './EmployeeList.css';

class EmployeeList extends Component {
  render() {

    return (
      <div id="list-container">
        <ul>
          { 
            this.props.employees.map((employee) => {
              // console.log('Mapping of employe list: ', employee);
              return (
                <li key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}> { employee.name } </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default EmployeeList;