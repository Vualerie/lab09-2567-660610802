'use client'
import Footer from "@components/Footer";
import Header from "@components/Header";
import Task from "@components/Task";
import TaskInput from "@components/TaskInput";

import { nanoid } from "nanoid";
import React, { useState } from "react";

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  deleteTaskFunc?: (taskId: number) => void;
  toggleDoneTaskFunc?: (taskId: number) => void;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const addTask = (newTaskTitle: string) => {
    const newTask: TaskItem = {
      id: nanoid(),
      title: newTaskTitle,
      completed: false,
    };
    const newTasks: TaskItem[] = [...tasks, newTask];
    if (newTaskTitle != "") {
      setTasks(newTasks);
    }
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleDoneTask = (taskId: string) => {
    const newTasks = structuredClone(tasks);
    const task = newTasks.find((x) => x.id === taskId);
    if (task != undefined) {
      task.completed = !task.completed;
      setTasks(newTasks);
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({tasks.filter((t) => t.completed).length})
        </p>

        <TaskInput addTaskFunc={addTask} />

        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      <Footer year="2024" fullName="Sirawit Seetong" studentId="660610802" />
    </div>
  );
}
