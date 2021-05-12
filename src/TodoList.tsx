import React, {ChangeEvent, useCallback} from "react";
import {FilerValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import EditableSpan from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilerValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilerValuesType
    removeTodolist: (todoList: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const TodoList = React.memo(function (props: TodoListPropsType) {


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),
        [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),
        [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),
        [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback ((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone )
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone )
    }



    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    }, [ props.removeTask, props.id])

    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean ) =>
        props.changeTaskStatus(taskId, newIsDoneValue, props.id), [  props.changeTaskStatus ,props.id])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.id)
    }, [ props.changeTaskTitle ,props.id])

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>

                <IconButton
                    onClick={removeTodolist}>
                    <Delete color='secondary'/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                { tasksForTodolist.map(t => {

                  /*  const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }*/

                    return (
                    <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                    )
                    /*<li key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <Checkbox
                            color={'secondary'}
                            checked={t.isDone}
                               onChange={onChangeStatusHandler}
                        />

                        <EditableSpan
                        title={t.title}
                        onChange={onChangeTitleHandler}/>


                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>*/
                })
                }
            </div>
            <div>
                <Button
                    color='primary'

                    size={'medium'}
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                >All
                </Button>
                <Button
                    color='primary'

                    size={'medium'}
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                >Active
                </Button>
                <Button
                    color='secondary'
                  //  variant={'outlined'}
                    size={'medium'}
                    onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                >Completed
                </Button>
            </div>
        </div>)
})

