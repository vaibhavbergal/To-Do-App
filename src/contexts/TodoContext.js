import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      task: "Todo 1",
      completed: false,
    },
  ],
  addTodo: (task) => {},
  updateTodo: (id, task) => {},
  deleteTodo: (id) => {},
  toggleTodo: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};
