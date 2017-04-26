<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project we will take a look at an employee management application and learn how it works. We will cover the following topics by going through each stage and building out a part of the application all the way up to the black diamond where you will build the entire application from nothing: 

* State
* Props
* JavaScript Classes
* .bind
* this
* componentWillReceiveProps ( React life cycle method )

We can control which stage we are on by using `index.js` in the `src/` directory. On lines 3 and 4 in `index.js` you should see:

```js
// Stage 1 - 5
import App from './Stage 1/App';
```

We can change stages by changing the number in the string. For example if I wanted stage 2, I would do: 

```js
import App from './Stage 2/App';
```

## Setup

* Run `npm install` in the root directory
* Run `npm start` to spin up a development server

## Stage 1

### Summary

In this stage we will fix context issues using `.bind` and `this`. If we inspect our application we can see that when we try to interact with the components nothing is working correctly and we are getting an error that `this.setState` is not a function.

### Instructions

Using the browser's developer tools figure out where `.bind` needs to be applied.

<details>

<summary> Detailed Instructions </summary>

<br />

The first error that you should encounter is when clicking on an employee. This error is happening when the `selectEmployee` method on `App` gets called from the `employeeList` component. What's happening here? We're losing our context of `this`. 

First let's cover the data flow to figure out why our context is getting lost. Inside of `App.js` we can see on line 37 we are rendering in our `EmployeeList` component with two props. One of those props being our `selectEmployee` method on `App`. This means that inside of the `employeeList` component it can access the method through `this.props.selectEmployee`. We are then using the `selectEmployee` prop on line 13 in `EmployeeList` in combination with an `onClick` event. 

Because of this current setup when the `selectEmployee` method gets called from `employeeList` `this` does not refer to the `App` class which has a `setState` method. `this` refers to the props on the `EmployeeList` component. We can prove that by adding a `console.log(this)` before `this.setState({})` gets called in the `selectEmployee` method. The log should look similiar to:

```js
{
  employees: [],
  selectEmployee: function
}
```

So if the `App` component has the method of `setState` how can we keep our context of `this` when calling the method in `EmployeeList`? We can `bind` it when the context of `this` equals the `App` component. In `App.js` when we render the `EmployeeList` component we can modify the prop `selectEmployee` to `this.selectEmployee.bind(this)`. Now our `selectEmployee` method should be working properly and updating the `EmployeeEditor` component on the right.

<details>

<summary> <code> App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Employee from './models/Employee';

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

  refresh() {
    this.setState(this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh } />
        </div>
      </div>
    )
  }
}

export default App;
```
</details>

<br />

The next error we should encounter is that the `save` and `cancel` buttons in the `EmployeeEditor` component are not working. Based on the error message in the browser debugger, it appears that `this` is equal to null when inside of the `save` and `cancel` methods. Since state exists on the component, we want to use `bind` when `this` equals the component. In our `onClick` methods we can `.bind(this)` to get the correct context.

```jsx
<button disabled={this.state.notModified} onClick={ this.save.bind(this) }> Save </button>
<button disabled={this.state.notModified} onClick={ this.cancel.bind(this) }> Cancel </button>
```

This will fix our `cancel` button context issue however you'll notice that `save` still has a context issue. This is because it calls a method passed down as a prop called `refreshList`. `refreshList` handles updating the `EmployeeList` names on the left hand side. If we add a `console.log(this)` we'll see it has a similiar issue of `this` referring to the object of props. If we `.bind(this)` when we pass the method down as a prop, just like we did for `selectEmployee`, then `this` will have the correct context.

<details>

<summary> <code> App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Employee from './models/Employee';

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

  refresh() {
    this.setState(this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh.bind(this) } />
        </div>
      </div>
    )
  }
}

export default App;
```

</details>

<details>

<summary> <code> EmployeeEditor.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './EmployeeEditor.css';

import '../../models/Employee';

class EmployeeEditor extends Component {

  componentWillReceiveProps(props) {
    this.setState({ employee: props.selected, originalEmployee: props.selected, notModified: true });
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
    if ( this.state.notModified ) {
      this.setState({ notModified: false });
    }

    var employee = Object.assign({}, this.state.employee);
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
            <button disabled={this.state.notModified} onClick={ this.save.bind(this) }> Save </button>
            <button disabled={this.state.notModified} onClick={ this.cancel.bind(this) }> Cancel </button>
          </div>
          :
          <p> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;
```

</details>

</details>

### Solution

<details>

<summary> <code> App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Employee from './models/Employee';

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

  refresh() {
    this.setState(this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div id="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh.bind(this) } />
        </div>
      </div>
    )
  }
}

export default App;
```

</details>

<details>

<summary> <code> EmployeeEditor.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './EmployeeEditor.css';

import '../../models/Employee';

class EmployeeEditor extends Component {

  componentWillReceiveProps(props) {
    this.setState({ employee: props.selected, originalEmployee: props.selected, notModified: true });
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
    if ( this.state.notModified ) {
      this.setState({ notModified: false });
    }

    var employee = Object.assign({}, this.state.employee);
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
            <button disabled={this.state.notModified} onClick={ this.save.bind(this) }> Save </button>
            <button disabled={this.state.notModified} onClick={ this.cancel.bind(this) }> Cancel </button>
          </div>
          :
          <p> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;
```

</details>

* insert giphy of data flow when design is complete here *