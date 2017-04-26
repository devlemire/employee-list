import React, { Component } from 'react';
import './App.css';

import Employee from './models/Employee';

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

        </div>
      </div>
    )
  }
}

export default App;
