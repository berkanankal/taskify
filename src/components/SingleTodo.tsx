import React, { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
