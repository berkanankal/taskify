import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: input,
        isDone: false,
      },
    ]);
    setInput("");
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
