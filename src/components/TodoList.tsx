import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
