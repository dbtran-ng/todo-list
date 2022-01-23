import {ADD_TASK, CHANGE_THEME, DONE_TASK, DELETE_TASK} from './../types/ToDoListTypes';
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
})