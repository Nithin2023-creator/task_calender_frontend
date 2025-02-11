import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const { date } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks?date=${date}`).then((res) => {
      setTasks(res.data);
    });
  }, [date]);

  return (
    <div className="p-5">
      <h2 className="text-2xl">Tasks for {date}</h2>
      <TaskForm date={date} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;
