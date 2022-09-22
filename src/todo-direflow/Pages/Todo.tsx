import React, { FC, useEffect, useState } from "react";
import { withStyles } from "direflow-component";
import todoStyles from "./todo.css";

interface IProps {
  showLimit: number;
}
const Todo: FC<any> = (props: IProps) => {
  const [showLimit, setShowLimit] = useState(10);
  const [todo, setTodo] = useState({
    todoName: "",
    desc: "",
    isUrgent: false,
  });
  useEffect(() => {
    if (props.showLimit && props.showLimit < 10) {
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
    console.log(todo);
  };

  const clear = () => {
    setTodo({
      todoName: "",
      desc: "",
      isUrgent: false,
    });
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
              >
                Add +
              </button>
              <button
                type="button"
                className="btn clear-btn ml-2"
                onClick={clear}
              >
                Clear
              </button>
            </form>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </>
  );
};

export default withStyles(todoStyles)(Todo);
