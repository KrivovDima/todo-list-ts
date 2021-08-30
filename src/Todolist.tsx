import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, tdID: string) => void
  changeFilter: (value: FilterValuesType, tdID: string) => void
  addTask: (title: string, tdID: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, tdID: string) => void
  filter: FilterValuesType
  removeTodolist: (tdID: string) => void
  onChangeTaskTitle: (title: string, id: string, tdID: string) => void
  onChangeTodolistTitle: (title: string, tdID: string) => void
}

export function Todolist(props: PropsType) {

  const addTaskHandler = (title: string) => {
    props.addTask(title, props.id);
  }

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const onClickRemoveTodolist = () => props.removeTodolist(props.id);

  const onChangeTodolistTitle = (newTitle: string) => {
    props.onChangeTodolistTitle(newTitle, props.id);
  }


  return <div>
    <h3>
      <EditableSpan onChange={onChangeTodolistTitle} title={props.title}/>
      <IconButton onClick={onClickRemoveTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm callback={addTaskHandler}/>
    <ul style={{listStyleType: "none", marginBottom: "10px"}}>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          }
          const onChangeTaskTitleHandler = (newTitle: string) => {
            props.onChangeTaskTitle(newTitle, t.id, props.id);
          }

          return <li key={t.id}
                     className={t.isDone ? "is-done" : ""}
                     >
            <Checkbox color="primary"
                      onChange={onChangeTaskStatusHandler}
                      checked={t.isDone}/>
            <EditableSpan onChange={onChangeTaskTitleHandler} title={t.title}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </li>
        })
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? "outlined" : "text"}
              onClick={onAllClickHandler}
              color="default">All</Button>
      <Button variant={props.filter === 'active' ? "outlined" : "text"}
              onClick={onActiveClickHandler}
              color="primary">Active</Button>
      <Button variant={props.filter === 'completed' ? "outlined" : "text"}
              onClick={onCompletedClickHandler}
              color="secondary">Completed</Button>
    </div>
  </div>
}
