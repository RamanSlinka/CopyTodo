import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {tasksAPI} from "../api/tasks-api";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3d0e16a8-fd7d-4f04-a847-cacf5931e58d'
    }
}

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c"
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c";
        let title = "task4";
        tasksAPI.createTask(todolistId, title)
                 .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c";
        let taskId = "6250c27d-c9e1-4f6b-958b-1b19968f4e70";
        tasksAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c";
        let taskId = "8435c34f-9fa4-4819-90a1-d44f3e33a3f5";
        let title = "task"
        tasksAPI.updateTask(todolistId,taskId,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
