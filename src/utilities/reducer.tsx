import { ACTIONS } from "./actions";
import { Action, Project } from "./types";

export const INITIAL_STATE: Project[] = [
  {
    name: "My Project",
    todos: [
      {
        title: "Do this",
        description: "Something you gotta do",
        dueDate: new Date().toISOString().split("T")[0],
        priority: "Normal",
        completed: false,
      },
    ],
  },
];

export function reducer(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return addTodo(state, action);
    case ACTIONS.REMOVE_TODO:
      return removeTodo(state, action);
    case ACTIONS.ADD_PROJECT:
      return addProject(state, action);
    case ACTIONS.CHANGE_PRIORITY:
      return changePriority(state, action);
    case ACTIONS.EDIT_TODO:
      return editTodo(state, action);
    default:
      return state;
  }
}

function addTodo(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  return state.map((project): Project => {
    if (project.name === action.payload?.projectName)
      return {
        name: project.name,
        todos: [...project.todos, action.payload.todo!],
      };
    return project;
  });
}

function removeTodo(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  return state.map((project): Project => {
    if (project.name === action.payload?.projectName) {
      const newTodos = project.todos.filter(
        (todo) => todo.title !== action.payload?.todo?.title
      );
      return { name: project.name, todos: newTodos };
    }
    return project;
  });
}

function addProject(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  if (!action.payload?.projectName) return state;
  return [...state, { name: action.payload?.projectName, todos: [] }];
}

function changePriority(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  const newState = state.map((project) => {
    if (project.name === action.payload?.projectName) {
      const newTodos = project.todos.map((todo) => {
        if (todo.title === action.payload?.todo?.title)
          return { ...todo, completed: !todo.completed };
        return todo;
      });
      return { name: project.name, todos: newTodos };
    }
    return project;
  });
  return newState;
}

// TODO: try to make changePriority and editTodo into a single function
// since they are both modifying todos anyway
function editTodo(state: Project[], action?: Action): Project[] {
  if (!action) return state;
  const newState = state.map((project) => {
    if (project.name === action.payload?.projectName) {
      const newTodos = project.todos.map((todo) => {
        if (todo.title === action.payload?.todo?.title)
          return {
            ...todo,
            title: action.payload.todo.title,
            description: action.payload.todo.description,
            dueDate: action.payload.todo.dueDate,
            priority: action.payload.todo.priority,
          };
        return todo;
      });
      return { name: project.name, todos: newTodos };
    }
    return project;
  });
  return newState;
}
