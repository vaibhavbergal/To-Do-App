import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/contexts";
import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";

function Form() {
  const [task, setTask] = useState("");
  const { addTodo, todos } = useTodo();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!task) return;

    const date = format(new Date(), "dd-MM-yyyy HH:mm");
    addTodo({
      id: todos.length + 1,
      task,
      date: date,
      completed: false,
    });
    setTask("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <CardContent className="flex items-center gap-6">
          <Input
            type="text"
            placeholder="Add Title here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <Button variant="destructive">Add Task</Button>
        </CardContent>
      </form>
    </>
  );
}

export default Form;
