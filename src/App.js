import React, { Component } from 'react';
import './App.css';

// Employee Class
import Employee from './models/Employee';

// Components
import Header from './components/Header/Header';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor/EmployeeEditor';

class App extends Component {
  constructor() {
    super();

    this.state = {
      employees: [ new Employee(0, 'James Bob', 3863089275, 'Baller'), new Employee(1, 'Smith John', 383492342, 'Ballerrrr') ],
      selectedEmployee: null
    };
  }

  selectEmployee(employee) {
    this.setState({ selectedEmployee: employee });
  }

  render() {
    console.log(this.state.employees);
    this.state.employees[0].updateVersion();
    console.log(this.state.employees);
    return (
      <div id="app">
        <Header />
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={this.selectEmployee.bind(this)} />
          <EmployeeEditor selected={this.state.selectedEmployee} />
        </div>
      </div>
    )
  }
}

export default App;
