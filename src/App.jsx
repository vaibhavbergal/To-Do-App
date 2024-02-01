import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./components/Form";
import { TodoContext } from "./contexts/TodoContext";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, task]);
  };

  const updateTodo = (id, task) => {
    setTodos(todos.map((todo) => (task.id === id ? { ...todo, task } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="flex justify-center min-h-screen pt-10 bg-slate-800 ">
        <Card className="w-full max-w-2xl bg-slate-400 h-fit">
          <CardHeader>
            <CardTitle className="font-mono text-3xl text-center ">
              To Do List
            </CardTitle>
          </CardHeader>

          <Form />

          <CardDescription className="px-1 py-2 bg-gray-600 rounded-lg">
            {todos.map((todo) => (
              <li key={todo.id} className="mx-2 my-2 list-none">
                <TodoItem todo={todo} />
              </li>
            ))}
          </CardDescription>
        </Card>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
