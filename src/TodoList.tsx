import React, {ChangeEvent} from "react";
import {FilerValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from '@material-ui/icons';


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


export function TodoList(props: TodoListPropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>

                <IconButton
                    onClick={removeTodolist}>
                    <Delete color='secondary'/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>

                        <Checkbox
                            color={'secondary'}
                            checked={t.isDone}
                               onChange={onChangeStatusHandler}
                        />

                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>


                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
                }
            </ul>
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
}

