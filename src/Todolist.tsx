import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import Task from "./Task";

export type TaskType = {
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

export const Todolist = React.memo((props: PropsType) => {

  const addTaskHandler = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.id, props.addTask])

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);

  const onClickRemoveTodolist = () => props.removeTodolist(props.id);

  const onChangeTodolistTitle = useCallback((newTitle: string) => {
    props.onChangeTodolistTitle(newTitle, props.id);
  }, [props.id])

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
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
        tasksForTodolist.map(t => {

          return <Task task={t}
                       todolistID={props.id}
                       removeTask={props.removeTask}
                       changeTaskStatus={props.changeTaskStatus}
                       onChangeTaskTitle={props.onChangeTaskTitle}
                       key={t.id}/>
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
})
