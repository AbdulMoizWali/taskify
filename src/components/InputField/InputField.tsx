import React, { useRef } from "react";
import "./style.css";

interface Prop {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  addCallback: (e: React.FormEvent) => void;
}

const InputField: React.FC<Prop> = ({ task, setTask, addCallback }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="inputContainer"
      onSubmit={(e) => {
        addCallback(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <button type="submit">Go</button>
    </form>
  );
};

export default InputField;
