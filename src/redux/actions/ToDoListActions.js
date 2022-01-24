import {ADD_TASK, CHANGE_THEME, DONE_TASK, DELETE_TASK, EDIT_TASK,UPDATE_TASK} from './../types/ToDoListTypes';
export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  newTask,
});
export const changeThemeAction = (themeId) => ({
  type: CHANGE_THEME,
  themeId,
});
export const deleteTaskAction = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId
  }
};
export const doneTaskAction = (taskId) => ({
  type: DONE_TASK,
  taskId
});
export const editTaskAction = (task) => ({
  type: EDIT_TASK,
  task
})
export const updateTaskAction = (taskName) => ({
  type: UPDATE_TASK,
  taskName
})