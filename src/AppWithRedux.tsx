import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import todolistsReducer, {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./state/todolists-reducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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
  [key: string] : Array<TaskType>
}

function AppWithRedux() {
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)
  const dispatch = useDispatch()

  function removeTask(id: string, tdID: string) {
    dispatch(removeTaskAC(id, tdID))
  }

  function addTask(title: string, tdID: string) {
    dispatch(addTaskAC(title, tdID))
  }

  function changeStatus(taskId: string, isDone: boolean, tdID: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, tdID))
  }


  function changeFilter(value: FilterValuesType, tdID: string) {
    dispatch(changeTodolistFilterAC(tdID, value))
  }

  function removeTodolist(tdID: string) {
    dispatch(removeTodolistAC(tdID))
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

  function onChangeTaskTitle(newTitle: string, id: string, tdID: string) {
    dispatch(changeTaskTitleAC(id, newTitle, tdID))
  }

  function onChangeTodolistTitle(newText: string, tdID: string) {
    dispatch(changeTodolistTitleAC(tdID, newText))
  }

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
              let tasksForTodolist = tasks[tl.id];

              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              }
              return <Grid item>
                <Paper style={{padding: "20px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
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
