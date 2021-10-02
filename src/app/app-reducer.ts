export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string
type ActionsType = ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
type InitialStateType = {
  status: RequestStatusType
  error: ErrorType
}

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS": {
      return {
        ...state,
        status: action.status
      }
    }
    case "APP/SET-ERROR": {
      return {
        ...state,
        error: action.error
      }
    }
    default: {
      return state;
    }
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const);
