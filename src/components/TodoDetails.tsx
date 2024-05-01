import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Todo } from "../utilities/types";
import { ContextProvider } from "./App";
import { ACTIONS } from "../utilities/actions";

export default function TodoDetails() {
  const navigate = useNavigate();
  const { dispatch } = useContext(ContextProvider);
  const { projectName, todo }: { projectName: string; todo: Todo } =
    useLocation().state;
  const [formData, setFormData] = useState(todo);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClick = () => {
    dispatch({
      type: ACTIONS.EDIT_TODO,
      payload: { projectName, todo: formData },
    });
    navigate("/", { state: projectName });
  };

  return (
    <div className="todo-details section">
      <h1 className="todo-details__title title">Edit Todo</h1>
      <form className="add-todo__form form container">
        <label htmlFor="title">Title</label>
        <input
          className="form__title form-item disabled"
          type="text"
          name="title"
          id="title"
          value={todo.title}
          disabled
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="form__description form-item"
          name="description"
          cols={30}
          rows={3}
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        ></textarea>
        <label htmlFor="date">Due date (dd-mm-yyyy)</label>
        <input
          className="form__date form-item"
          type="date"
          name="date"
          id="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />
        <label htmlFor="priority">Priority</label>
        <select
          className="form__priority form-item"
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button
          className="form__submit form-item btn"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Edit todo
        </button>
      </form>
    </div>
  );
}
