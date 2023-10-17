import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      setTodos([...todos, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    /* if (source.droppableId === "ActiveTodos") {
      const todo = todos.find((todo) => todo.id === parseInt(draggableId));
      if (todo) {
        todo.isDone = true;
        setCompletedTodos([...completedTodos, todo]);
        setTodos(todos.filter((todo) => todo.id !== parseInt(draggableId)));
      }
    } else {
      /// Source is CompletedTodos
      const todo = completedTodos.find(
        (todo) => todo.id === parseInt(draggableId)
      );
      if (todo) {
        todo.isDone = false;
        setTodos([...todos, todo]);
        setCompletedTodos(
          completedTodos.filter((todo) => todo.id !== parseInt(draggableId))
        );
      }
    } */

    let add,
      active = todos,
      completed = completedTodos;

    if (source.droppableId === "ActiveTodos") {
      add = active[source.index];
      // active.splice will delete the item from the array
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "ActiveTodos") {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      completed.splice(destination.index, 0, add);
    }

    setCompletedTodos(completed);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {" "}
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField task={task} setTask={setTask} addCallback={addTask} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>{" "}
    </DragDropContext>
  );
};

export default App;
