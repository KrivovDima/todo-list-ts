import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>

function todolistsReducer(state: Array<TodoListType>, action: ActionsType): Array<TodoListType> {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tdl => tdl.id !== action.todolistID)
    }
    case "ADD-TODOLIST": {
      return [
        {id: v1(), title: action.title, filter: "all"},
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

const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    todolistID
  } as const
}

const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    title
  } as const
}

const changeTodolistTitle = (todolistID: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todolistID,
    title
  } as const
}

const changeTodolistFilter = (todolistID: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistID,
    filter
  } as const
}

export default todolistsReducer;