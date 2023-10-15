import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(todo.task);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  const todoDone = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todoDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  const todoTaskEdit = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: editTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEdit(false);
  };

  const todoEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    todoTaskEdit(id);
  };

  return (
    <form
      className={todo.isDone ? "todoSingle todoDone" : "todoSingle"}
      onSubmit={(e) => todoEdit(e, todo.id)}
    >
      {/* {todo.isDone ? (
        <s className="todoTask">{todo.task}</s>
      ) : (
        <span className="todoTask">{todo.task}</span>
      )} */}
      {isEdit ? (
        <input
          ref={inputRef}
          className="todoTask"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
        />
      ) : (
        <span className="todoTask">{todo.task}</span>
      )}

      <div>
        {isEdit ? (
          <AiFillEdit className="icon" onClick={(e) => todoTaskEdit(todo.id)} />
        ) : (
          <AiOutlineEdit
            className="icon"
            onClick={() => {
              if (!isEdit && !todo.isDone) {
                setIsEdit(!isEdit);
              }
            }}
          />
        )}
        <AiOutlineDelete className="icon" onClick={() => todoDelete(todo.id)} />
        <MdDone className="icon" onClick={() => todoDone(todo.id)} />
      </div>
    </form>
  );
};

export default SingleTodo;
