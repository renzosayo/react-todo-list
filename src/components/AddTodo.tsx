import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "./App";
import { ACTIONS } from "../utilities/actions";
import { Todo } from "../utilities/types";

export default function AddTodo() {
  const project = useLocation().state;
  const navigate = useNavigate();
  const { dispatch } = useContext(ContextProvider);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: Date().toString(),
    priority: "Normal",
  } as Todo);

  const handleAdd = (projectName: string, todo: Todo) => {
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { projectName, todo },
    });
    navigate("/", { state: project });
  };

  const handleInput = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="add-todo section">
      <h1 className="add-todo__title title">Add to {project.name}</h1>
      <form className="add-todo__form form container">
        <label htmlFor="title">Title</label>
        <input
          className="form__title form-item"
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={(e) => {
            handleInput("title", e.target.value);
          }}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="form__description form-item"
          name="description"
          cols={30}
          rows={3}
          id="description"
          value={formData.description}
          onChange={(e) => handleInput("description", e.target.value)}
        ></textarea>
        <label htmlFor="date">Due date</label>
        <input
          className="form__date form-item"
          type="date"
          name="date"
          id="date"
          value={formData.dueDate}
          onChange={(e) => handleInput("dueDate", e.target.value)}
        />
        <label htmlFor="priority">Priority</label>
        <select
          className="form__priority form-item"
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={(e) => handleInput("priority", e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button
          className="form__submit form-item btn"
          onClick={(e) => {
            e.preventDefault();
            handleAdd(project.name, formData);
          }}
        >
          Add todo
        </button>
      </form>
    </div>
  );
}
