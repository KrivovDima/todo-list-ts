import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {filterType, taskType} from "./App";

type TodoListPropsType = {
  title: string
  tdListID: string
  tasks: Array<taskType>
  deleteTask: (idTask: string) => void
  setFilter: (filter: filterType) => void
  addTask: (titleTask: string) => void
  checkedTasks: (idTask: string, checkedStatus: boolean) => void
  filter: filterType
}

function TodoList(props: TodoListPropsType) {

  let [newTask, setNewTask] = useState<string>('');
  let [error, setError] = useState<boolean>(false);

  const addTask = () => {
    const trimTextTask = newTask.trim();
    if (trimTextTask !== '') {
      props.addTask(trimTextTask);
    } else {
      setError(true);
    }
  }

  const renderList = props.tasks.map((task) => {
    const handlerCheckbox = (event: MouseEvent<HTMLInputElement>) => {
      const checkedStatus = event.currentTarget.checked;
      props.checkedTasks(task.id, checkedStatus)
    }
    return (
      <li key={task.id}>
        <input type="checkbox"
               checked={task.isDone}
               onClick={handlerCheckbox}/>
        <span>{task.title}</span>
        <button onClick={() => {
          props.deleteTask(task.id)
        }}>x
        </button>
      </li>
    )
  });

  const allFilter = () => {
    props.setFilter('all')
  };
  const activeFilter = () => {
    props.setFilter('active')
  };
  const completeFilter = () => {
    props.setFilter('completed')
  };
  const saveTaskText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
    setError(false);
  }
  const addTaskForClick = () => {
    addTask();
    setNewTask('');
  };
  const addTaskForKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      addTask();
      setNewTask('');
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input onChange={saveTaskText}
               value={newTask}
               onKeyPress={addTaskForKeyPress}
               className={error ? 'error' : ''}/>
        <button onClick={addTaskForClick}>+</button>
        <div className={`errorMessage ${error && 'errorMessageVisible'}`}>Title required</div>
      </div>
      <ul>
        {renderList}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'activeFilter' : ''}
                onClick={allFilter}>
          All
        </button>
        <button className={props.filter === 'active' ? 'activeFilter' : ''}
                onClick={activeFilter}>
          Active
        </button>
        <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                onClick={completeFilter}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;