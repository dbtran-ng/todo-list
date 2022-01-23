import React, { Component } from 'react';
import DemoTheme from './Themes/DemoTheme';
import ToDoList from './ToDoList/ToDoList';
export default class App extends Component {
  render() {
    return <div>
      <ToDoList/>
    </div>;
  }
}
