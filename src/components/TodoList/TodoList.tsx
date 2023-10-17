import React from "react";
import { Todo } from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="ActiveTodos">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeading">Active Task</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  // index={}
                  todo={todo}
                  activeTodos={todos}
                  setActiveTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="CompletedTodos">
        {(provided) => (
          <div
            className="todos completed"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeading">Completed Task</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  activeTodos={todos}
                  setActiveTodos={setCompletedTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  //  <div className="todos">
  //   {todos.map((todo) => {
  //     return (
  //       <SingleTodo
  //         key={todo.id}
  //         todo={todo}
  //         todos={todos}
  //         setTodos={setTodos}
  //       />
  //     );
  //   })}
  // </div>
};

export default TodoList;
