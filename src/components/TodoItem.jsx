import { useTodo } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CardContent, CardDescription } from "./ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
      className={`flex border rounded-lg items-center gap-4 px-2 py-3  ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-green-400"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer "
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <Input
        className={`border-transparent outline-none w-full bg-transparent rounded-lg  ${
          isTodoEditable
            ? "border-black/10 px-2"
            : "hover:cursor-default border-transparent text-black "
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <Button
        variant="outline"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
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
