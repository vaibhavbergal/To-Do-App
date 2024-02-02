import { useTodo } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CardContent, CardDescription } from "./ui/card";
import { FaDeleteLeft } from "react-icons/fa6";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);
  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, todoMsg);
    setIsTodoEditable(false);
  };

  return (
    <CardDescription
      className={`flex border rounded-lg items-center gap-4 px-2  ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-green-400"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer "
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <CardContent className="w-full p-0 py-1">
        <Input
          className={`shadow-none border-transparent outline-none w-full bg-transparent rounded-lg  ${
            isTodoEditable
              ? "border-black/10 px-2"
              : "hover:cursor-default border-transparent text-black "
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <p className="text-xs ">{todo.date}</p>
      </CardContent>

      <Button
        variant="outline"
        onClick={() => setIsTodoEditable(!isTodoEditable)}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </Button>

      <Button
        variant="destructive"
        className="text-xl text-black/80"
        onClick={() => deleteTodo(todo.id)}
      >
        <FaDeleteLeft />
      </Button>
    </CardDescription>
  );
}

export default TodoItem;
