import React, { Component } from 'react';
import { Container } from '../Components/Container';
import { ThemeProvider } from 'styled-components';
import { ToDoListDarkTheme } from '../Themes/ToDoListDarkTheme';
import { ToDoListLightTheme } from '../Themes/ToDoListLightTheme';
import { ToDoListPrimaryTheme } from '../Themes/ToDoListPrimaryTheme';
import { Dropdown } from '../Components/DropDown';
import { Table, Td, Tr, Th, Thead, Tbody } from '../Components/Table';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from '../Components/Heading';
import { TextField, Label, Input } from '../Components/TextField';
import { Button } from '../Components/Button';
import { connect } from 'react-redux';
import {
  addTaskAction,
  changeThemeAction,
  doneTaskAction,
  deleteTaskAction,
  editTaskAction,
  updateTaskAction,
} from '../redux/actions/ToDoListActions';
import { arrTheme } from '../Themes/ThemeManager';
class ToDoList extends Component {
  state = {
    taskName: '',
    disabled: true,
  };
  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option value={theme.id} key={index}>
          {theme.name}
        </option>
      );
    });
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit" />
              </Button>
              <Button
                onClick={() => this.props.dispatch(doneTaskAction(task.id))}
                className="ml-1"
              >
                <i className="fa fa-check" />
              </Button>
              <Button
                onClick={() => this.props.dispatch(deleteTaskAction(task.id))}
                className="ml-1"
              >
                <i className="fa fa-trash" />
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => this.props.dispatch(deleteTaskAction(task.id))}
                className="ml-1"
              >
                <i className="fa fa-trash" />
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;

              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To Do List</Heading3>
          {/* <Label>Task Name</Label>
          <Input/> */}

          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState({ taskName: e.target.value });
            }}
            name="taskName"
            label="Task Name"
            className="w-50"
          ></TextField>

          <Button
            onClick={() => {
              let { taskName } = this.state;
              let newtask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              this.setState({ taskName: '' }, () => {
                this.props.dispatch(addTaskAction(newtask));
              });
            }}
            className="ml-2"
          >
            <i className="fa fa-plus" />
            Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTaskAction(this.state.taskName));
              }}
              className="ml-2"
            >
              <i className="fa fa-upload" />
              Update task
            </Button>
          ) : (
            <Button
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: '',
                  },
                  () => {
                    this.props.dispatch(updateTaskAction(taskName));
                  }
                );
              }}
              className="ml-2"
            >
              <i className="fa fa-upload" />
              Update task
            </Button>
          )}

          <hr />
          <Heading3>Task to Do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <hr />
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
