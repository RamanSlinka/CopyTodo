import React, {useReducer, useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar, Button, IconButton, Toolbar,
    Typography, Container, Grid, Paper
} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

import {
     removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC
} from "./state/task-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, } from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilerValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilerValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}




export default function AppWithRedux () {
//BLL:

    let todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    /* const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
         {id: todoListID_1, title: 'What to learn', filter: 'all'},
         {id: todoListID_2, title: 'What to buy', filter: 'all'}
     ])

     const [tasks, dispatchTasks] = useReducer(tasksReducer, {
         [todoListID_1]: [
             {id: v1(), title: 'JS', isDone: false},
             {id: v1(), title: 'HTML', isDone: true},
             {id: v1(), title: 'CSS', isDone: true},
             {id: v1(), title: 'React', isDone: false}
         ],
         [todoListID_2]: [
             {id: v1(), title: 'Milk', isDone: false},
             {id: v1(), title: 'Book', isDone: true},
             {id: v1(), title: 'Bread', isDone: true},
             {id: v1(), title: 'RedBull', isDone: false}
         ],
     })*/



    function removeTask(taskId: string, todolistId: string) {
        let action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }


    function changeTodoListFilter(newFilterValue: FilerValuesType, todoListID: string) {
        let action = ChangeTodolistFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodolistTitleAC(newTitle, todoListID)
        dispatch(action)
    }

    function removeTodolist(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatch(action)
    }


        function addTodoList(title: string) {
            let action = AddTodolistAC(title)
            dispatch(action)

        }


        //UI:


        const todoListComponents = todoLists.map(tl => {
                let tasksForTodoList = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                }
                return (
                    <Grid item key={tl.id}>
                        <Paper elevation={10} style={{padding: '20px'}}>
                            <TodoList
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasksForTodoList}
                                removeTodolist={removeTodolist}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeFilter={changeTodoListFilter}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodoListTitle}
                            />
                        </Paper>
                    </Grid>
                )
            }
        )
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            TodoList
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <Container fixed>
                    <Grid container style={{padding: '20px 0'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListComponents}
                    </Grid>
                </Container>
            </div>
        )
}

