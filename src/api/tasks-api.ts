import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '3d0e16a8-fd7d-4f04-a847-cacf5931e58d'
    }
})


type taskType = {
    task: {
        id: string
        title: string
        description: null
        todoListId: string
        order: number
        status: number
        priority: number
        startDate: null
        deadline: null
        addedDate: string
    }
}

type tasksType = {
    items: taskType[]
    totalCount: number
    error: null
}

type CommonResponseType<T> = {
    data: T
    resultCode: number
    messages: string[]

}


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<tasksType>(`/${todolistId}tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{item: taskType}>>(`/${todolistId}tasks`,
            {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType<{}>>(`/${todolistId}tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseType<{item: tasksType}>>(`/${todolistId}/tasks/${taskId}`, {title})
    }

}
