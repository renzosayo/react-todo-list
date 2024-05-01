import { useContext } from "react";
import { ContextProvider } from "./App";
import { Project } from "../utilities/types";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { state, setSelected } = useContext(ContextProvider);
  const projectsList = state.map((project: Project) => project.name);
  const navigate = useNavigate();

  function handleChangeProject(projectName: string) {
    setSelected(projectName);
    navigate("/");
  }

  function handleClickAddProject() {
    navigate("/add-project");
  }

  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Projects</h2>
      <ul className="sidebar__projects-list projects">
        {projectsList.map((projectName) => (
          <li
            className="projects__item"
            key={projectName}
            onClick={() => handleChangeProject(projectName)}
          >
            {projectName}
          </li>
        ))}
      </ul>
      <button className="sidebar__add btn" onClick={handleClickAddProject}>
        Add project...
      </button>
    </div>
  );
}
