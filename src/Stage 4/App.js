import React, { Component } from 'react';
import './App.css';

import Employee from './models/Employee';

import Header from './components/Header/Header';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor/EmployeeEditor';

class App extends Component {
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
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee } />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh } />
        </div>
      </div>
    )
  }
}

export default App;
