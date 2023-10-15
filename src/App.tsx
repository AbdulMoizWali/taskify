import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList/TodoList";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setTodos([...todos, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  console.log("todos", todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField task={task} setTask={setTask} addCallback={addTask} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
