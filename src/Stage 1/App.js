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

  // Update the selected employee, gets called from EmployeeList.js
  selectEmployee(employee) {
    console.log(this);
    this.setState({ selectedEmployee: employee });
  }

  // Refresh the list of employees on save, gets called from EmployeeEditor.js
  refresh() {
    this.setState(this.state);
  }

  render() {
    // console.log(this.state.employees);
    return (
      <div id="app">
        <Header />
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } test="this is a test" />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh } />
        </div>
      </div>
    )
  }
}

export default App;
