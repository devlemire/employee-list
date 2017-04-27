<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project we will take a look at an employee management application and learn how it works. We will cover the following topics by going through each stage and building out a part of the application all the way up to the black diamond where you will build the entire application from nothing: 

* State
* Props
* JavaScript Classes
* .bind
* this
* componentWillReceiveProps ( React life cycle method )

We can control which stage we are on by using `index.js` in the `src/` directory. On line 3 in `index.js` you should see:

```js
import App from './Stage 1/App';
```

We can change stages by changing the number in the string. For example if I wanted stage 2, I would do: 

```js
import App from './Stage 2/App';
```

Also, in this project the stages will build on top of each other. Every stage will have you repeat the process of the last stage(s). Try to do the previous stage(s) steps from memory if possible and re-visit their detailed instructions if you get lost. The solution to every file can be found on the <a href="https://github.com/devlemire/employee-list/tree/solution/src">solution branch</a>

## Setup

* `Fork` and `clone` this repository
* Run `npm install` in the root directory
* Run `npm start` to spin up a development server

<b> Add image of finished project when design is complete </b>

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

</details>

### Solution

<b>insert giphy of data flow when design is complete here</b>

## Stage 2

In this stage we will re-create our `componentWillReceiveProps` life cycle method in the `EmployeeEditor` component.

### Instructions

### Solution

<details> 

<summary> <code> App.js </code> </summary>

```jsx

```

</details>

</details>

<details>

<summary> <code> EmployeeEditor.js </code> </summary>

```jsx

```

</details>

## Stage 3

### Summary

In this stage we will re-create our `handleChange` method in the `EmployeeEditor` component.

### Instructions

Create a `handleChange` method on the `EmployeeEditor` component that takes in what property to change and what value to give that property as parameters. Remember that we do not want to update the original object directly because a user may want to press cancel. Also we want to update `notModified` on state from `true` to `false` since a modification has occured. 

<details>

<summary> Detailed Instructions </summary>

<br />

Well start by creating the skeleton of our method:

```jsx
handleChange(prop, val) {

}
```

The next thing we'll want to do is change the `notModified` property on state from `true` to `false`. When we update this property on state the Save and Cancel buttons will no longer be disabled ( allowing a user to click on them ). We also only need to update this property if it is `true`, so let's add an if statement to wrap our `setState` call.

```jsx
handleChange(prop, val) {
  if ( this.state.notModified ) {
    this.setState({ notModified })
  }
}
```

Now we can update our `employee` property on state. However we do not want to modifiy the original 

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

<summary> <code> EmployeeEdtior.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './EmployeeEditor.css';

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

## Stage 4

### Summary

In this stage we will re-create our `Employee` model.

### Instructions

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
    this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected, notModified: true });
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

    this.state.employee[prop] = val;
    this.setState({ employee: this.state.employee });
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

<details>

<summary> <code> Employee.js </code> </summary>

```jsx
export default class Employee {
  constructor(id, name, phone, title) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.title = title;
  }
  
  updateName(name) {
    this.name = name;
  }

  updatePhone(phone) {
    this.phone = phone;
  }

  updateTitle(title) {
    this.title = title;
  }
}
```

</details>


## Stage 5

### Summary

In this stage we will re-create our `save` and `cancel` methods in the `EmployeeEditor` component.

### Instructions

Create a `save` and a `cancel` method in the `EmployeeEditor` component. 

<b> Save </b>
* Call all three `update` methods on the `Employee` model with the values on `this.state.employee`
* Update `this.state.notModified` to be `true`
* Call the `refreshList` method off of props

<b> Cancel </b>
* Update `employee` to be `originalEmployee` on state

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by adding empty methods to the `EmployeeEditor` component. 

<details>

<summary> <code> Empty Methods </code> </summary>

```jsx
save() {

}

cancel() {

}
```

</details>

<br />

Now let's dive into each of them. Let's start with `save`. On saving an employee we want to update its record in the original array that is being stored in `App.js`. If we take a look at that array of employees we'll notice that each employee is a new instance of the `Employee` model. We can check out the `Employee` model by going into `src/Stage 2/models/Employee.js`. 

```js
export default class Employee {
  constructor(id, name, phone, title) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.title = title;
  }
  
  updateName(name) {
    this.name = name;
  }

  updatePhone(phone) {
    this.phone = phone;
  }

  updateTitle(title) {
    this.title = title;
  }
}
```

We'll see that our `Employee` class has three prototypes: `updateName`, `updatePhone`, and `updateTitle`. We can use these to update each individual employee. 

Since there is such a minimal amount to update on the employee we'll make our `save` method call all three prototypes whether or not all three have been changed.

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

## Stage 6

### Summary

In this stage we will re-create our `selectEmployee` and `refresh` methods on the `App` component.

### Instructions

### Solution

## Stage 7

### Summary

In this stage we will re-create our `constructor` functions and state in `App.js` and `EmployeeEditor.js`.

## Stage 8

In this stage we will `render` our child components in `App.js`.

## Stage 9

### Summary

In this stage we will `render` our list of employees in the `EmployeeList` component by mapping over the prop `employees`.

### Instructions

### Solution

## Black Diamond

Try to re-create the project from scratch.