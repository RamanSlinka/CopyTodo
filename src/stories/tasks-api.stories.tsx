import React, {useEffect, useState} from 'react'
import axios from 'axios';


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
            axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
                .then((res) => {
                    setState(res.data);
                })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c"
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title: "second task"}, settings)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolistId = "d5dee4f1-a4e9-4bca-868a-b64ca883a68c"
        let taskId = "81ad12c5-bd5d-42d0-baad-6eb1d9a5c70c"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
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
            let taskId = "af01c921-c2b1-4af2-a91c-eb4b7f8c929e";
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,{title: "third task"}, settings)
                .then((res) => {
                    setState(res.data)
                })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
