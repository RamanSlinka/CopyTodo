export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


//status === 'loading'


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR' :
            return {...state, error: action.error}
        default:
            return state
    }

}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = setAppStatusActionType | setAppErrorActionType