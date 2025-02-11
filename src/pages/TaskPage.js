import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks?date=${date}`).then((res) => {
      setTasks(res.data);
    });
  }, [date]);

  return (
    <div className="p-4 sm:p-5 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="btn-primary flex items-center gap-2"
          aria-label="Back to calendar"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-xl sm:text-2xl">Tasks for {date}</h2>
      </div>
      <TaskForm date={date} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;