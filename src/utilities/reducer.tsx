import { ACTIONS } from "./actions";
import { Action, Project } from "./types";

export const INITIAL_STATE: Project[] = [
  {
    name: "My Projects",
    todos: [
      {
        title: "Do this",
        description: "Something you gotta do",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Normal",
      },
      {
        title: "Do this next",
        description: "Something you gotta do after",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Low",
      },
      {
        title: "Do this after",
        description: "Something you gotta do after",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Low",
      },
    ],
  },
  {
    name: "Web Dev",
    todos: [
      {
        title: "Web Do this",
        description: "Something you gotta do",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Normal",
      },
      {
        title: "Web Do this next",
        description: "Something you gotta do after",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Low",
      },
      {
        title: "Do this after",
        description: "Something you gotta do after",
        dueDate: new Date().toLocaleDateString("de-DE"),
        priority: "Low",
      },
    ],
  },
];

export function reducer(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return state.map((project): Project => {
        if (project.name === action.payload?.projectName)
          return {
            name: project.name,
            todos: [...project.todos, action.payload.todo!],
          };
        return project;
      });
    case ACTIONS.REMOVE_TODO:
      return state.map((project): Project => {
        if (project.name === action.payload?.projectName) {
          const newTodos = project.todos.filter(
            (todo) => todo.title !== action.payload?.todo?.title
          );
          return { name: project.name, todos: newTodos };
        }
        return project;
      });
    case ACTIONS.ADD_PROJECT:
      if (!action.payload?.projectName) return state;
      return [...state, { name: action.payload?.projectName, todos: [] }];
    default:
      return state;
  }
}
