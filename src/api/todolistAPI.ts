import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3d0e16a8-fd7d-4f04-a847-cacf5931e58d'
    }
})


type todoType = {
    id: string
    title: string
    addedData: string
    order: number
}


type CommonResponseType<T> = {
    resultCode: number
    messages: string[],
    fieldsError: string[],
    data: T
}



export const todolistAPI = {
    getTodos() {
        return instance.get<todoType[]>('todo-lists')
    },
    createTodos(title: string) {
        return instance.post<CommonResponseType<{item: todoType}>>('todo-lists',
            {title})
    },
    deleteTodos(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodos(todolistId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }

}
