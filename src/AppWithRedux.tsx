import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)
  const dispatch = useDispatch()

  const removeTask = useCallback((id: string, tdID: string) => {
    dispatch(removeTaskAC(id, tdID))
  }, [dispatch])

  const addTask = useCallback((title: string, tdID: string) => {
    dispatch(addTaskAC(title, tdID))
  }, [dispatch])

  const changeStatus = useCallback((taskId: string, isDone: boolean, tdID: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, tdID))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, tdID: string) => {
    dispatch(changeTodolistFilterAC(tdID, value))
  }, [dispatch])

  const removeTodolist = useCallback((tdID: string) => {
    dispatch(removeTodolistAC(tdID))
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

  const onChangeTaskTitle = useCallback((newTitle: string, id: string, tdID: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, tdID))
  }, [dispatch])

  const onChangeTodolistTitle = useCallback((newText: string, tdID: string) => {
    dispatch(changeTodolistTitleAC(tdID, newText))
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "30px"}}>
          <AddItemForm callback={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todoLists.map((tl) => {

              return <Grid item key={tl.id}>
                <Paper style={{padding: "20px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    onChangeTaskTitle={onChangeTaskTitle}
                    onChangeTodolistTitle={onChangeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
