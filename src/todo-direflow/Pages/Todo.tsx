import React, { FC, useEffect, useState } from "react";
import { withStyles } from "direflow-component";
import todoStyles from "./todo.css";
import {
  getLocalStorageData,
  setDataInLocalStorage,
} from "./../utils/Common.service";
import { CommonConstant } from "../utils/Common.constants";

interface IProps {
  showLimit: number;
}

interface TodoType {
  todoName: string;
  desc: string;
  isUrgent: boolean;
}
const Todo: FC<any> = (props: IProps) => {
  const [showLimit, setShowLimit] = useState(10);
  const [allTodos, setAllTodos] = useState([] as any);
  const [todo, setTodo] = useState({
    todoName: "",
    desc: "",
    isUrgent: false,
  } as TodoType);

  useEffect(() => {
    setAllTodos(getLocalStorageData("todo"));
  }, []);
  useEffect(() => {
    if (props.showLimit && props.showLimit < showLimit) {
      setShowLimit(props.showLimit);
    }
  }, [props]);

  const handleChange = (e: any) => {
    if (e.target.name !== "isUrgent") {
      const { name, value } = e.target;
      setTodo((prev) => ({ ...prev, [name]: value }));
    } else {
      const { name, checked } = e.target;
      setTodo((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const addTodo = () => {
    const isTodoAlreadyExists = allTodos.some(
      (item: TodoType) =>
        item.todoName.toLowerCase() === todo.todoName.toLowerCase()
    );
    if (!isTodoAlreadyExists) {
      if (allTodos.length < showLimit) {
        const data = [...allTodos, todo];
        setDataInLocalStorage("todo", data);
        setAllTodos(data);
        clear();
      } else {
        alert("You can not add more than" + showLimit + " todos");
      }
    } else {
      alert("todo already exists");
    }
  };

  const clear = () => {
    setTodo({
      todoName: "",
      desc: "",
      isUrgent: false,
    });
  };

  const deleteTodo = (deletingItem: TodoType) => {
    if (deletingItem) {
      const filteredData = allTodos.filter(
        (todo: TodoType) =>
          todo.todoName.toLowerCase() !== deletingItem.todoName.toLowerCase()
      );
      setAllTodos(filteredData);
      setDataInLocalStorage("todo", filteredData);
    }
  };

  const checkEnableDisable = (type: string): boolean => {
    if (type.toLowerCase() === CommonConstant.add.toLowerCase()) {
      return todo.todoName ? false : true;
    } else {
      return todo.todoName || todo.desc || todo.isUrgent ? false : true;
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <form className="form">
              <div className="mb-3">
                <label htmlFor="todoInp" className="form-label">
                  Todo Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todoInp"
                  name="todoName"
                  value={todo.todoName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="todoDesc" className="form-label">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="form-control"
                  id="todoDesc"
                  name="desc"
                  value={todo.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isUrgent"
                  name="isUrgent"
                  checked={todo.isUrgent ? true : false}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isUrgent">
                  Urgent
                </label>
              </div>
              <button
                type="button"
                className="btn submit-btn"
                onClick={addTodo}
                disabled={checkEnableDisable("add")}
              >
                Add +
              </button>
              <button
                type="button"
                className="btn clear-btn ml-2"
                onClick={clear}
                disabled={checkEnableDisable("clear")}
              >
                Clear
              </button>
            </form>
          </div>
          <div className="col-md-8">
            {allTodos && allTodos.length ? (
              <div>
                <ul className="todo-container">
                  {allTodos.map((todo: TodoType, index: number) => {
                    if (index + 1 <= showLimit) {
                      return (
                        <li key={index}>
                          <span>
                            <button
                              className="btn btn-danger delete-btn"
                              onClick={() => deleteTodo(todo)}
                            >
                              &times;
                            </button>
                          </span>
                          <strong>{todo.todoName}</strong>:{" "}
                          <span
                            style={{ color: todo.isUrgent ? "red" : "black" }}
                          >
                            {todo.desc}
                          </span>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            ) : (
              <p>No todo</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withStyles(todoStyles)(Todo);
