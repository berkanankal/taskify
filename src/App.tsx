import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/models";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    const completedTodos = localStorage.getItem("completedTodos");

    if (todos) {
      setTodos(JSON.parse(todos));
    }

    if (completedTodos) {
      setCompletedTodos(JSON.parse(completedTodos));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodoList = [
      ...todos,
      {
        id: Date.now(),
        title: input.trim(),
        isDone: false,
      },
    ];

    setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));

    setInput("");
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log("destination", destination);
    console.log("source", source);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add = {} as Todo;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);

      localStorage.setItem("todos", JSON.stringify(active));
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);

      localStorage.setItem("completedTodos", JSON.stringify(complete));
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      add.isDone = false;
      active.splice(destination.index, 0, add);
      localStorage.setItem("todos", JSON.stringify(active));
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
      localStorage.setItem("completedTodos", JSON.stringify(complete));
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>

        <InputField
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
