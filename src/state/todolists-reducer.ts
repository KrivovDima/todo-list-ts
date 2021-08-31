import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodoListType> = []

function todolistsReducer(state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tdl => tdl.id !== action.todolistID)
    }
    case "ADD-TODOLIST": {
      return [
        {id: action.todolistID, title: action.title, filter: "all"},
        ...state
      ]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(tdl => tdl.id === action.todolistID ? {...tdl, title: action.title} : tdl)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(tdl => tdl.id === action.todolistID ? {...tdl, filter: action.filter} : tdl)
    }
    default: {
      return state;
    }
  }
}

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    todolistID,
  } as const
}

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    title,
    todolistID: v1(),
  } as const
}

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todolistID,
    title,
  } as const
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistID,
    filter,
  } as const
}

export default todolistsReducer;