export type Todo = {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
};

export type Priority = "Low" | "Normal" | "High";

export type Project = {
  name: string;
  todos: Todo[];
};

type Payload = {
  projectName?: string;
  todo?: Todo;
};

export type Action = {
  type: string;
  payload?: Payload;
};

export interface IContextProps {
  state: Project[];
  dispatch: ({ type, payload }: Action) => void;
  selected: string;
  setSelected: (newState: string) => void;
}
