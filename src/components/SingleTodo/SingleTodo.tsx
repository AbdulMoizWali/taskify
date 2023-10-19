import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// import { MdDone } from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  activeTodos: Todo[];
  setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  dropabbleId: string;
  setArchivedTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  activeTodos: todos,
  setActiveTodos: setTodos,
  dropabbleId,
  setArchivedTodos,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(todo.task);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  /* const todoDone = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }; */

  const todoDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    if (setArchivedTodos) {
      console.log("====================================");
      console.log("setArchivedTodos");
      console.log("====================================");
      let removedTodo: Todo | undefined = todos
        .filter((todo) => todo.id === id)
        ?.pop();
      if (removedTodo) {
        removedTodo.isDone = true;
        setArchivedTodos([removedTodo]);
      }
      setTodos(updatedTodos);
    }
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todoSingle ${todo.isDone ? "todoDone" : ""} ${
            dropabbleId === "ArchivedTodos" ? "todoArchived" : ""
          }`}
          onSubmit={(e) => todoEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
            {todo.isDone ? null : isEdit ? (
              <AiFillEdit
                className="icon"
                onClick={(e) => todoTaskEdit(todo.id)}
              />
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
            {dropabbleId === "ArchivedTodos" ? null : (
              <AiOutlineDelete
                className="icon"
                onClick={() => todoDelete(todo.id)}
              />
            )}
            {/* <MdDone className="icon" onClick={() => todoDone(todo.id)} /> */}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
