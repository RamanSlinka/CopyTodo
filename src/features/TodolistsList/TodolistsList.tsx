import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [dispatch, demo, isLoggedIn])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        if(demo) return;
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch, demo])

    const addTask = useCallback(function (title: string, todolistId: string) {
        if(demo) return;
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch, demo])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        if(demo) return;
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch, demo])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        if(demo) return;
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch, demo])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        if(demo) return;
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch, demo])

    const removeTodolist = useCallback(function (id: string) {
        if(demo) return;
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [dispatch, demo])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        if(demo) return;
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch, demo])

    const addTodolist = useCallback((title: string) => {
       if (demo) return;
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch, demo])


    if (!isLoggedIn){
        return <Redirect to={'/Login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
