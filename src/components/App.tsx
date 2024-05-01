import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ViewTodo from "./ViewTodo";
import AddTodo from "./AddTodo";
import NotFound from "./NotFound";
import Sidebar from "./Sidebar";
import { createContext, useReducer, useState } from "react";
import { INITIAL_STATE, reducer } from "../utilities/reducer";
import { IContextProps } from "../utilities/types";
import TodoDetails from "./TodoDetails";
import { AddProject } from "./AddProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Sidebar />
        <Outlet />
      </>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ViewTodo />,
      },
      {
        path: "/add-todo",
        element: <AddTodo />,
      },
      {
        path: "/todo-details",
        element: <TodoDetails />,
      },
      {
        path: "/add-project",
        element: <AddProject />,
      },
    ],
  },
]);

export const ContextProvider = createContext({} as IContextProps);

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [selected, setSelected] = useState("My Project");

  return (
    <>
      <Header />
      <ContextProvider.Provider
        value={{ state, dispatch, selected, setSelected } as IContextProps}
      >
        <RouterProvider router={router} />
      </ContextProvider.Provider>
      <Footer />
    </>
  );
}

export default App;
