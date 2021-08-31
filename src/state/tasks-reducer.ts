import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

export type TasksReducerActionsType = ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

function tasksReducer(state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
      }
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
      }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistID]: []
      }
    }
    case "REMOVE-TODOLIST": {
      const copyState = {...state};
      delete copyState[action.todolistID];
      return copyState;
    }
    default: {
      return state;
    }
  }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
  return {
    type: "REMOVE-TASK",
    taskID,
    todolistID
  } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
  return {
    type: "ADD-TASK",
    title,
    todolistID,
  } as const
}

export const changeTaskStatusAC = (taskID: string, status: boolean, todolistID: string) => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskID,
    status,
    todolistID,
  } as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskID,
    title,
    todolistID,
  } as const
}

export default tasksReducer;