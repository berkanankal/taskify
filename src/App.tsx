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

      if (destination.droppableId !== "TodosList") {
        add.isDone = true;
        let newTodos = todos.filter((todo) => todo.id !== add.id);
        localStorage.setItem("todos", JSON.stringify(newTodos));

        let newCompletedTodos = [...completedTodos, add];
        localStorage.setItem(
          "completedTodos",
          JSON.stringify(newCompletedTodos)
        );
      }

      active.splice(source.index, 1);
    } else {
      add = complete[source.index];

      if (destination.droppableId !== "TodosRemove") {
        add.isDone = false;

        let newCompletedTodos = completedTodos.filter(
          (todo) => todo.id !== add.id
        );
        localStorage.setItem(
          "completedTodos",
          JSON.stringify(newCompletedTodos)
        );

        let newTodos = [...todos, add];
        localStorage.setItem("todos", JSON.stringify(newTodos));
      }

      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
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
