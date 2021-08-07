import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TodoList from "./TodoList";

export type taskType = {
  id: string
  title: string
  isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed'
type todoListsDefaultType = Array<todoListType>
type todoListType = {
  tdID: string
  title: string
  filter: filterType
}

function App() {
  const tdID1 = v1();
  const tdID2 = v1();

  const todoListsDefault: todoListsDefaultType = [
    {tdID: tdID1, title: 'Home tasks', filter: 'all'},
    {tdID: tdID2, title: 'Learn tasks', filter: 'active'},
  ];


  const tasksDefault = [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Hello world", isDone: true},
    {id: v1(), title: "I am Happy", isDone: false},
    {id: v1(), title: "Yo", isDone: false}
  ];

  let [tasks, setTasks] = useState(tasksDefault);
  let [filter, setFilter] = useState<filterType>('all');

  const addTask = (titleTask: string) => {
    const newTask = {id: v1(), title: titleTask, isDone: false}
    setTasks([newTask, ...tasks])
  }

  const deleteTask = (idTask: string) => {
    const unremovedTasks = tasks.filter((task) => task.id !== idTask);
    setTasks(unremovedTasks);
  }


  const checkedTasks = (idTask: string, checkedStatus: boolean) => {
    const checkedListTasks = tasks.map(
      (task) => {
        if (task.id === idTask) {
          const copyTask = {...task};
          copyTask.isDone = checkedStatus;
          return copyTask;
        } else {
          return task;
        }
      }
    );
    setTasks(checkedListTasks);
  }

  return (
    <div className="App">
      {
        todoListsDefault.map((tdList) => {
          let filteredTasks = [...tasks];
          switch (filter) {
            case 'active':
              filteredTasks = tasks.filter((task) => !task.isDone);
              break;
            case 'completed':
              filteredTasks = tasks.filter((task) => task.isDone);
          }

          return <TodoList
            key={v1()}
            title={tdList.title}
            tdListID={tdList.tdID}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            setFilter={setFilter}
            addTask={addTask}
            checkedTasks={checkedTasks}
            filter={tdList.filter}
          />
        })
      }

      {/*<TodoList tasks={filteredTasks}*/}
      {/*          deleteTask={deleteTask}*/}
      {/*          setFilter={setFilter}*/}
      {/*          addTask={addTask}*/}
      {/*          checkedTasks={checkedTasks}*/}
      {/*          filter={filter}*/}
      {/*/>*/}
    </div>
  );
}

export default App;
