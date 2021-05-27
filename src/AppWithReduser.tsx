import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar,
    Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

import {tasksReducer, removeTaskAC,
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {TaskType, Todolist} from "./Todolist";


export type FilerValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilerValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export default function AppWithReducers() {
//BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    // @ts-ignore
    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
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
    })


    function removeTask(taskId: string, todolistId: string) {
        let action = removeTaskAC(taskId, todolistId)
        dispatchTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        /* const newTask: TaskType = {
             id: v1(),
             title: title,
             isDone: false
         }
         const todoListTasks = tasks[todoListID]
         tasks[todoListID] = [newTask, ...todoListTasks]
         setTasks({...tasks})*/
        let action = addTaskAC(title, todoListID)
        dispatchTasks(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        /*   const todoListTasks = tasks[todoListID]
           const task = todoListTasks.find(t => t.id === taskID)
           if (task) {
               task.isDone = newIsDoneValue
               setTasks({...tasks})
           }*/
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        /* const todoListTasks = tasks[todoListID]
         const task = todoListTasks.find(t => t.id === taskID)
         if (task) {
             task.title = newTitle
             setTasks({...tasks})
         }*/
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchTasks(action)
    }


    function changeTodoListFilter(newFilterValue: FilerValuesType, todoListID: string) {
        /* const todoList = todoLists.find(tl => tl.id === todoListID)
         if (todoList) {
             todoList.filter = newFilterValue
             setTodoLists([...todoLists])
         }*/
        let action = changeTodolistFilterAC(todoListID, newFilterValue )
        dispatchTodolists(action)
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        /*const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }*/
        let action = changeTodolistTitleAC(newTitle, todoListID)
        dispatchTodolists(action)
    }

    function removeTodolist(todoListID: string) {
        /* setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
         delete tasks[todoListID]*/
        let action = removeTodolistAC(todoListID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        /* const newTodoListID = v1()
         const newTodoList: TodolistType = {id: newTodoListID, title: title, filter: 'all'}
         setTodoLists([...todoLists, newTodoList])
         setTasks({...tasks, [newTodoListID]: []})*/
        let action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }


    //UI:

    // @ts-ignore
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
                        <Todolist
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



