import React, { Component } from 'react';

import Employee from './models/Employee';

import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor';

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

  refresh() {
    this.setState(this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div className="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee } />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh } />
        </div>
      </div>
    )
  }
}

export default App;
