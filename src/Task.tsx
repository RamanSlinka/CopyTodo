import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";

import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";




export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }

    const changeTaskTitle = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue)
    }

    const removeTask = () => {
        props.removeTask(props.task.id)
    }


    return <>
        <div className={props.task.isDone ? "is-done" : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}
                color={'primary'}/>

            <EditableSpan
                title={props.task.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    </>
})