import { useContext, useState } from "react";
import { ContextProvider } from "./App";
import { ACTIONS } from "../utilities/actions";
import { useNavigate } from "react-router-dom";

export function AddProject() {
  const { dispatch } = useContext(ContextProvider);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_PROJECT, payload: { projectName } });
    navigate("/");
  }

  function handleChange(projectName: string) {
    setProjectName(projectName);
  }

  return (
    <div className="add-project section">
      <h1 className="add-project__title title">Add Project</h1>
      <form className="add-project__form form container">
        <label htmlFor="project-name">New Project</label>
        <input
          type="text"
          name="project-name"
          id="project-name"
          className="form__projectName form-item"
          onChange={(e) => handleChange(e.target.value)}
          value={projectName}
        />
        <button
          className="form__submit form-item btn"
          onClick={(e) => handleClick(e)}
        >
          Add project
        </button>
      </form>
    </div>
  );
}
