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
          <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } test="this is a test" />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh } />
        </div>
      </div>
    )
  }
}

export default App;
```

</details>

</details>

### Solution