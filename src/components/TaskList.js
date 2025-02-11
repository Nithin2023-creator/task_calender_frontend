import React from "react";
import axios from "axios";

const TaskList = ({ tasks, setTasks }) => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
    });
  };

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div key={task._id} className="card mb-2">
          <h3 className="text-xl">{task.title}</h3>
          <p>{task.description}</p>
          <button className="button mt-2" onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
