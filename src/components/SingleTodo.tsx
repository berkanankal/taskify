import React, { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, setTodos, index }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const handleDelete = () => {
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));

    const todos = localStorage.getItem("todos");
    const completedTodos = localStorage.getItem("completedTodos");

    if (todos) {
      localStorage.setItem(
        "todos",
        JSON.stringify(
          JSON.parse(todos).filter((item: Todo) => item.id !== todo.id)
        )
      );
    }

    if (completedTodos) {
      localStorage.setItem(
        "completedTodos",
        JSON.stringify(
          JSON.parse(completedTodos).filter((item: Todo) => item.id !== todo.id)
        )
      );
    }
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editInput.trim() === "") return;

    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            title: editInput.trim(),
          };
        }
        return item;
      })
    );

    const todos = localStorage.getItem("todos");

    if (todos) {
      localStorage.setItem(
        "todos",
        JSON.stringify(
          JSON.parse(todos).map((item: Todo) => {
            if (item.id === todo.id) {
              return {
                ...item,
                title: editInput.trim(),
              };
            }
            return item;
          })
        )
      );
    }

    setIsEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => {
            handleEdit(e);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEdit ? (
            <input
              type="text"
              value={editInput}
              ref={inputRef}
              className="todos__single--text"
              onChange={(e) => setEditInput(e.target.value)}
              style={{
                borderRadius: "10px",
              }}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.title}</s>
          ) : (
            <span className="todos__single--text">{todo.title}</span>
          )}
          <div>
            {!todo.isDone && (
              <span
                className="icon"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setEditInput(todo.title);
                }}
              >
                <AiFillEdit />
              </span>
            )}

            {!isEdit && (
              <>
                <span className="icon">
                  <AiFillDelete onClick={handleDelete} />
                </span>
              </>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
