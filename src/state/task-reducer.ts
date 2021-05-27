
import {v1} from 'uuid';

import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../App";
import { TaskType } from '../Todolist';


export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}


export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string

}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todolistId: string

}


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    |  ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    |RemoveTodolistActionType;


const initialState: TasksStateType  = {}

export const tasksReducer = (state= initialState , action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            let copyState = {...state}
            copyState[action.todolistId] =
                copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }

        case 'ADD_TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            let newTaskTodolist = [newTask, ...state[action.todolistId]]
            return {
                ...state,
                [action.todolistId]: newTaskTodolist
            }
        }
        case 'CHANGE_TASK_STATUS': {

            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(task => {
                        if (task.id === action.taskId) {
                            return {...task, isDone: action.isDone}
                        } else {
                            return task
                        }
                    })
            }
        }

        case 'CHANGE_TASK_TITLE': {

            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(task => {
                        if (task.id === action.taskId) {
                            return {...task, title: action.title}
                        } else {
                            return task
                        }
                    })
            }
        }

        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
}

export const changeTaskStatusAC =
    (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
        return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
    }

export const changeTaskTitleAC =
    (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
        return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
    }

