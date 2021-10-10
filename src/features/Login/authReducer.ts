import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoginInAC>

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGIN-IN": {
      return {
        ...state,
        isLoggedIn: action.value
      }
    }
    default: {
      return state;
    }
  }
}

export const setIsLoginInAC = (value: boolean) => ({type: "login/SET-IS-LOGIN-IN", value} as const);

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.login(email, password, rememberMe)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoginInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoginInAC(false));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}