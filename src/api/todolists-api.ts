import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e98254e3-f006-4d39-b52d-ad99d83a542e'

    }
})

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});

    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);

    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title});

    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

export const authAPI = {
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', data)

    },
    me() {
        return  instance.get<ResponseType<AuthMeType>>('/auth/me')

    },
    logout() {
        return  instance.delete<ResponseType>('/auth/login')

    }
}


// types
export type AuthMeType = {
    id: number
    email: string
    login: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    fieldsError: string[]
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
