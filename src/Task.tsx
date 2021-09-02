import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  task: TaskType
  todolistID: string
  removeTask: (taskId: string, tdID: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, tdID: string) => void
  onChangeTaskTitle: (title: string, id: string, tdID: string) => void
}

const Task = React.memo((props:TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todolistID)
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID);
  }
  const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
    props.onChangeTaskTitle(newTitle, props.task.id, props.todolistID);
  }, [props.task.id,props.todolistID])

  return (
    <li
        className={props.task.isDone ? "is-done" : ""}
    >
      <Checkbox color="primary"
                onChange={onChangeTaskStatusHandler}
                checked={props.task.isDone}/>
      <EditableSpan onChange={onChangeTaskTitleHandler} title={props.task.title}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </li>
  )
})

export default Task;