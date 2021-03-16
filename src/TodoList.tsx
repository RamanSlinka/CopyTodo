import React, {ChangeEvent} from "react";
import {FilerValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
        props.changeTodolistTitle(props.id,newTitle )
    }

    const addTask  = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>

                <button onClick={removeTodolist}>X</button>
            </h3>

           <AddItemForm  addItem={addTask}/>

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
                        <input type="checkbox" checked={t.isDone}
                               onChange={onChangeStatusHandler}
                        />

                        <EditableSpan  title={t.title}
                                       onChange={onChangeTitleHandler}/>


                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button
                    onClick={onAllClickHandler}
                    className={props.filter === 'all' ? 'active-filter' : ''}
                >All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                >Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                >Completed
                </button>
            </div>
        </div> )
}

