import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID1, title: 'Home tasks', filter: 'all'},
    {id: todoListID2, title: 'Learn tasks', filter: 'all'},
  ])
  let [tasks, setTasks] = useState({
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
    const copyTasks = {...tasks};
    copyTasks[tdID] = tasks[tdID].filter(t => t.id !== id);
    setTasks(copyTasks);
  }

  function addTask(title: string, tdID: string) {
    const task = {id: v1(), title: title, isDone: false};
    const copyTasks = {...tasks};
    copyTasks[tdID] = [task, ...copyTasks[tdID]];
    setTasks(copyTasks);
  }

  function changeStatus(taskId: string, isDone: boolean, tdID: string) {
    const copyTasks = {...tasks};
    copyTasks[tdID] = tasks[tdID].map(t => t.id === taskId ? {...t, isDone} : t);
    setTasks(copyTasks);
  }


  function changeFilter(value: FilterValuesType, tdID: string) {
    setTodoLists(todoLists.map(tl => tdID === tl.id ? {...tl, filter: value} : tl))
  }

  function removeTodolist(tdID: string) {
    setTodoLists(todoLists.filter(td => td.id !== tdID))
  }

  function addTodolist(title: string) {
    const copyTodoLists = [...todoLists];
    const tdID = v1();
    const newTodolist: TodoListType = {id: tdID, title: title, filter: 'all'};
    setTodoLists([newTodolist, ...copyTodoLists]);
    setTasks({[tdID]:[], ...tasks});
  }


  return (
    <div className="App">
      <AddItemForm callback={addTodolist}/>
      {
        todoLists.map((tl) => {
          let tasksForTodolist = tasks[tl.id];

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          return <Todolist
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
          />
        })
      }
    </div>
  );
}

export default App;
