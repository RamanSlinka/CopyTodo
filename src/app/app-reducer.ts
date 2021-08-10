import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {AppThunkType} from "./store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string;


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppIsInitializedActionType


const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false

}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET/IS-INITIALIZED', isInitialized} as const)


export const initializeAppTC = (): AppThunkType => (dispatch) => {
   dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error,dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}


