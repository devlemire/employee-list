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

Using the browser's developer tools figure out where `.bind` needs to be applied in `App.js` and `EmployeeEditor.js`.

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

```jsx
<EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
```

The next error we should encounter is that the `save` and `cancel` buttons in the `EmployeeEditor` component are not working. Based on the error message in the browser debugger, it appears that `this` is equal to `null` when inside of the `save` and `cancel` methods. Since state exists on the component, we want to use `bind` when `this` equals the component. In our `onClick` methods we can `.bind(this)` to get the correct context.

```jsx
<button disabled={this.state.notModified} onClick={ this.save.bind(this) }> Save </button>
<button disabled={this.state.notModified} onClick={ this.cancel.bind(this) }> Cancel </button>
```

This will fix our `cancel` button context issue however you'll notice that `save` still has a context issue. This is because it calls a method passed down as a prop called `refreshList`. `refreshList` handles updating the `EmployeeList` names on the left hand side. If we add a `console.log(this)` in the `refreshList` method we'll see it has a similiar issue of `this` referring to the object of props. If we `.bind(this)` when we pass the method down as a prop in `App.js`, just like we did for `selectEmployee`, then `this` will have the correct context.

```jsx
<EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
<EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh.bind(this) } />
```

</details>

## Stage 2

In this stage we will re-create our `componentWillReceiveProps` life cycle method in the `EmployeeEditor` component. This life cycle method handles updating our `state` in `EmployeeEditor.js` when the `selected` prop gets updated from the `EmployeeList` component.

### Instructions

Create a `componentWillReceiveProps` method in `EmployeeEditor.js` that has one parameter: `props`. The method should be written after the `constructor` method and will update the following `state` properties using `setState`: `employee` and `originalEmployee`. `employee` should be updated to a copy of the `selected` object from `props` and `originalEmployee` should be updated to the `selected` object from `props`.

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeEditor.js` from `src/Stage 2/components/EmployeeEdtior/EmployeeEditor.js` and look for the `//componentWillReceiveProps` comment. Let's create our `componentWillReceiveProps` method there with one parameter called `props`.

```jsx
componentWillReceiveProps(props) {

}
```

This life cycle method will be called whenever the `props` for `EmployeeEditor` get updated after the initial render. We'll use the parameter `props` to catch the updated props object and use it with `this.setState` to update our state. Remember that we want to update `employee` and `originalEmployee` on state with the `selected` prop. We also want to make sure that `employee` is a copy of the `selected` object. Since our `EmployeeEditor` component is only rendered with two `props`, our `props` parameter in `componentWillReceiveProps` will look like: 

```js
{
  selected: { } // This is an object of 1 employee ( the one that was selected from the list )
  refreshList: function // This is a method from App.js that will refresh the list of employees
}
```

Let's dive into why we are using `employee` and `originalEmployee`, or in other words why a copy and a original of the same object. In JavaScript if I set a variable equal to an already defined object they both reference the same object. For example:

```js
var obj1 = {
  name: 'James'
}

var obj2 = obj1;
obj2.name = 'Override';

console.log(obj1.name); // 'Override'
```

Even though I created a new variable `obj2` and changed the `name` property on `obj2`, `obj2` and `obj1`'s `name` property was updated to `'Override'`. This would be bad for our `onChange` event that updates our state because we don't want changes to be final until the user presses the `Save` button.



</details>

## Stage 3

### Summary

In this stage we will re-create our `handleChange` method in `EmployeeEditor.js`.

### Instructions

Create a `handleChange` method on the `EmployeeEditor` component that takes in what property to change and what value to give that property as parameters. Also we want to update `notModified` on state from `true` to `false` since a modification has occured. 

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

## Stage 4

### Summary

In this stage we will re-create our `Employee` model in `Employee.js`. 

### Instructions

Create a class called `Employee` in `models/Employee.js`. This class should have a constructor method that takes an `id`, `name`, `phone`, and `title` parameter. It should then assign those onto the class. This class should also have three methods: `updateName`, `updatePhone`, and `updateTitle`. Each method will take in a string as a parameter and then update the corresponding property on the class with the string.

## Stage 5

### Summary

In this stage we will re-create our `save` and `cancel` methods in the `EmployeeEditor` component.

### Instructions

Create a `save` method after the `handleChange` method that calls all three `update` methods on the `Employee` model. Use the values on `state` when calling the `update` methods. This method should also set `notModified` not state from `true` to `false` and finally call the `refreshList` method off of props. Then create a `cancel` method after the `save` method that updates `employee` to `originalEmployee` on state. 

<details>

<summary> Detailed Instructions </summary>

<br />

</details>

## Stage 6

### Summary

In this stage we will re-create our `selectEmployee` and `refresh` methods on the `App` component.

### Instructions

Create a `selectEmployee` method after the `constructor` method that takes an `employee` as a parameter. The method should then use `setState` to update the `selectedEmployee` property on state to the passed in `employee`. Then create a `refresh` method after the `selectedEmployee` method. This method should just call `setState` with the argument of `this.state`. 

## Stage 7

### Summary

In this stage we will re-create our `constructor` methods and state in `App.js` and `EmployeeEditor.js`.

### Instructions

Create a `constructor` method that calls `super();` and creates an empty state object ( `this.state = {}` ) in both `App.js` and `EmployeeEditor.js`. Then use the bullet lists to fill in the state properties:

<b> State properties for `App.js` </b>
* employees: [ ( array of new Employee ) ]
* selectedEmployee: null

<b> State properties for `EmployeeEditor.js` </b>
* employee: null
* originalEmployee: null
* notModified: true

## Stage 8

In this stage we will `render` our child components in `App.js`.

### Instructions

Import the `Header`, `EmployeeList`, and `EmployeeEditor` components into `App.js`. Then `render` the `Header` component nested under the `div` with the `id` of `app` and `render` the `EmployeeList` and `EmployeeEditor` components nested under the `div` with the `id` of `main-container`. 

<details>

<summary> Detailed Instructions </summary>

<br />

In `src/Stage 8/App.js` let's begin by importing our three components. Based on the filte structure inside of stage 8 we can see there is a components folder at the same level of `App.js`. Therefore we will be importing our components from `'./components/'`. Let's `import` our components in `App.js` where it says `// Components`.

```jsx
import Header from './components/Header/Header';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor/EmployeeEditor';
```

Now that `App.js` has access to these components we can then `render` them. Let's `render` the `Header` component nested inside of the `div` with the `id` of `app`. And `render` the `EmployeeList` and `EmployeeEditor` component nested in the `div` with the `id` of `main-container`.

```jsx
return (
  <div id="app">
    <Header />
    <div id="main-container">
      <EmployeeList />
      <EmployeeEditor />
    </div>
  </div>
)
```

Now we need to add the `props` so our child components can still function correctly. For `EmployeeList` to function correctly it will need two props: `employees` and `selectEmployee`. `employees` should equal the array of employees kept on state in `App.js` and `selectEmployee` should equal the method on `App.js` that calls `setState` to update the selected employee.

```jsx
return (
  <div id="app">
    <Header />
    <div id="main-container">
      <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
      <EmployeeEditor />
    </div>
  </div>
)
```

For `EmployeeEditor` to function correctly it will need two props: `selected` and `refreshList`. `selected` should equal the `selectedEmployee` property on `App.js`'s state and `refreshList` should equal the method on `App.js` that calls `setState(this.state)`.

```jsx
return (
  <div id="app">
    <Header />
    <div id="main-container">
      <EmployeeList employees={this.state.employees} selectEmployee={ this.selectEmployee.bind(this) } />
      <EmployeeEditor selected={this.state.selectedEmployee} refreshList={ this.refresh.bind(this) } />
    </div>
  </div>
)
```

</details>

## Stage 9

### Summary

In this stage we will `render` our list of employees in the `EmployeeList` component by mapping over the prop `employees`.

### Instructions

Map over `this.props.employee` to return `<li>` elements. Use the `id` of the employee as the `key` for the element, add an `onClick` to each `<li>` to call `selectEmployee` with the current employee as an argument, and set the text value of the `<li>` to the `name` of the employee.

<details>

<summary> Detailed Instructions </summary>

<br />

Open `EmployeeList.js` from `src/Stage 9/components/EmployeeList/EmployeeList.js` and look for the `// Map over this.props.employees` comment. 

```jsx
<ul>
  { 
    // Map over this.props.employees
  }
</ul>
```

Let's remove the comment and make the skeleton for our mapping. Let's call the parameter for the mapping's callback function `employee` and `return` nothing.

```jsx
<ul>
  { 
    this.props.employees.map((employee) => {
      return (

      )
    })
  }
</ul>
```

Now each item in the `this.props.employee` array will be referenced in our callback function as `employee` and we can add JSX inside of our return. Let's have our callback return a `<li>` element that has a `key` attribute equal to the `employee.id`. 

```jsx
<ul>
  { 
    this.props.employees.map((employee) => {
      return (
        <li key={employee.id}></li>
      )
    })
  }
</ul>
```

We'll also want to add an `onClick` attribute that uses an arrow function that calls the `selectEmployee` method from props with the current `employee`. 

```jsx
<ul>
  { 
    this.props.employees.map((employee) => {
      return (
        <li key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}></li>
      )
    })
  }
</ul>
```

And finally we want the text of the `<li>` element to be the name of the `employee`.

```jsx
<ul>
  { 
    this.props.employees.map((employee) => {
      return (
        <li key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}> { employee.name } </li>
      )
    })
  }
</ul>
```

</details>

## Black Diamond ( Stage 10 )

Re-create the project from Stages 1 - 9 without looking back at code solutions. If you have to look back at a certain stage, restart from Stage 1 again.