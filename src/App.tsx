import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
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

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />

      {todos.map((todo, index) => (
        <ul key={index}>
          <li>{todo.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default App;
