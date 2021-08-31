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

function AppWithReducers() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, dispatchForTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todoListID1, title: 'Home tasks', filter: 'all'},
    {id: todoListID2, title: 'Learn tasks', filter: 'all'},
  ])
  let [tasks, dispatchForTasksReducer] = useReducer(tasksReducer, {
    [todoListID1]: [
      {id: v1(), title: "Buy milk", isDone: true},
      {id: v1(), title: "Buy bread", isDone: false},
      {id: v1(), title: "Buy cola", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ]
  })

  function removeTask(id: string, tdID: string) {
    dispatchForTasksReducer(removeTaskAC(id, tdID))
  }

  function addTask(title: string, tdID: string) {
    dispatchForTasksReducer(addTaskAC(title, tdID))
  }

  function changeStatus(taskId: string, isDone: boolean, tdID: string) {
    dispatchForTasksReducer(changeTaskStatusAC(taskId, isDone, tdID))
  }


  function changeFilter(value: FilterValuesType, tdID: string) {
    dispatchForTodolistsReducer(changeTodolistFilterAC(tdID, value))
  }

  function removeTodolist(tdID: string) {
    dispatchForTodolistsReducer(removeTodolistAC(tdID))
    dispatchForTasksReducer(removeTodolistAC(tdID))
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title)
    dispatchForTodolistsReducer(action)
    dispatchForTasksReducer(action)
  }

  function onChangeTaskTitle(newTitle: string, id: string, tdID: string) {
    dispatchForTasksReducer(changeTaskTitleAC(id, newTitle, tdID))
  }

  function onChangeTodolistTitle(newText: string, tdID: string) {
    dispatchForTodolistsReducer(changeTodolistTitleAC(tdID, newText))
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

export default AppWithReducers;
