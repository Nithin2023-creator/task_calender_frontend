import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ date, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { date, category: "DSA", title, description };

    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 card">
      <input
        className="w-full p-2 mb-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="button w-full">Add Task</button>
    </form>
  );
};

export default TaskForm;
