import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "./App";
import { ACTIONS } from "../utilities/actions";
import { Todo } from "../utilities/types";

export default function ViewTodo() {
  const navigate = useNavigate();
  const { state, selected, dispatch } = useContext(ContextProvider);
  const [project] = state.filter((project) => project.name === selected);

  const handleRemove = (project: string, todo: Todo) => {
    dispatch({
      type: ACTIONS.REMOVE_TODO,
      payload: { projectName: project, todo },
    });
  };

  const handleChange = (project: string, todo: Todo) => {
    dispatch({
      type: ACTIONS.CHANGE_PRIORITY,
      payload: { projectName: project, todo },
    });
    navigate("/");
  };

  return (
    <div className="view-todo section">
      <h1 className="view-todo__title title">{project.name}</h1>
      {project.todos.length >= 1 ? (
        <ul className="view-todo__list">
          {project.todos.map((todo) => {
            return (
              <li className="todo" key={todo.title}>
                <input
                  className="todo__checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleChange(project.name, todo)}
                />
                <p
                  className={"todo__title" + (todo.completed ? " strike" : " ")}
                  onClick={() =>
                    navigate("/todo-details", {
                      state: { projectName: project.name, todo },
                    })
                  }
                >
                  {todo.title}
                </p>
                <p
                  className={
                    "todo__priority " +
                    (todo.priority === "High"
                      ? "high-priority"
                      : todo.priority === "Normal"
                      ? "normal-priority"
                      : "low-priority")
                  }
                >
                  {todo.priority}
                </p>
                <button
                  className="todo__remove"
                  onClick={() => handleRemove(project.name, todo)}
                ></button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="view-todo__empty">
          This project is empty. Click 'Add todo...' to start adding your todo
          items.
        </p>
      )}
      <button
        className="view-todo__add btn"
        onClick={() => navigate("/add-todo", { state: project })}
      >
        Add todo...
      </button>
    </div>
  );
}
