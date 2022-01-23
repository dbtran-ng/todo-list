import {ToDoListDarkTheme} from './../../Themes/ToDoListDarkTheme';
import {ADD_TASK, CHANGE_THEME, DONE_TASK, DELETE_TASK} from './../types/ToDoListTypes';
import {arrTheme} from '../../Themes/ThemeManager';
const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList:[
        {id: 'task-1', taskName: 'task 1', done: true},
        {id: 'task-2', taskName: 'task 2', done: false},
        {id: 'task-3', taskName: 'task 3', done: true}
    ]
}

const ToDoListReducer = ( state =initialState, action)=>{
    switch(action.type){
        case ADD_TASK:{
            console.log('todo',action.newTask);
            if(action.newTask.taskName.trim() ===''){
                alert('Please enter a task name!');
                return {...state};
            }
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
            if(index !== -1){
                alert('Task ' + action.newTask.taskName + ' already exists');
                return {...state};
            }
            taskListUpdate.push(action.newTask);
            state.taskList = taskListUpdate;
            return {...state};
        }
        case CHANGE_THEME:{
            let themeUpdate = arrTheme.find(theme => theme.id == action.themeId);

            if ( themeUpdate ){
                state.themeToDoList = {...themeUpdate.theme};
            }
            return {...state};
        }
        case DONE_TASK:{
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id == action.taskId);
            if ( index !== -1 ){
                taskListUpdate[index].done = true;
            }
            return {...state, taskList: taskListUpdate};
        }
        case DELETE_TASK:{
            let taskListUpdate = [...state.taskList];
            // method-1 : using findIndex => splice 
            // let index = taskListUpdate.findIndex(task => task.id == action.taskId);
            // if ( index !== -1 ){
            //     taskListUpdate.splice(index, 1);
            // }

            // method-2 : using filter
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);
            return {...state, taskList: taskListUpdate};
        }
        default:
            return {...state};
    }
}

export default ToDoListReducer;