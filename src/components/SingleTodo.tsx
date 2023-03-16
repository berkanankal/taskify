import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { Todo } from "../models/models";

interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, setTodos }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(todo.title);

  const handleDelete = () => {
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
  };

  const handleDone = () => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      })
    );
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            title: editInput,
          };
        }
        return item;
      })
    );
    setIsEdit(false);
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        handleEdit(e);
      }}
    >
      {isEdit ? (
        <input
          type="text"
          value={editInput}
          className="todos__single--text"
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.title}</s>
      ) : (
        <span className="todos__single--text">{todo.title}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!todo.isDone) {
              setIsEdit(!isEdit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete onClick={handleDelete} />
        </span>
        <span className="icon">
          <MdOutlineDone onClick={handleDone} />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
