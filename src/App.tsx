import { useState, useEffect } from "react";
import "./App.scss";
import { ITask } from "./models/ITask";
import { Header } from "./components/Header";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function handleAddTask(task: string) {
    const list = [...tasks, { id: crypto.randomUUID(), task, done: false }];
    saveTasks(list);
  }

  function handleToggleTaskDone(task: ITask) {
    const list = tasks.map((t) =>
      t.id == task.id ? { ...task, done: !task.done } : t
    );
    saveTasks(list);
  }

  function handleDeleteTask(task: ITask) {
    const list = tasks.filter((t) => t.id != task.id);
    saveTasks(list);
  }

  function handleClearCompleted() {
    const list = tasks.filter((t) => !t.done);
    saveTasks(list);
  }

  function updateList(list: ITask[]) {
    saveTasks(list);
  }

  function saveTasks(list: ITask[]) {
    localStorage.setItem("tasks", JSON.stringify(list));
    setTasks(list);
  }

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (tasks && typeof localTasks == "string") {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

  return (
    <>
      <div className="App">
        <Header />
        <CreateTodo onCreate={handleAddTask} />
        <TodoList
          list={tasks}
          onClearCompleted={handleClearCompleted}
          onCheck={handleToggleTaskDone}
          onDelete={handleDeleteTask}
          onUpdateList={updateList}
        />
      </div>
    </>
  );
}

export default App;
