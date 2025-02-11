import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const Home = () => {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    navigate(`/tasks/${date}`);
  };

  return (
    <div className="p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Task Tracker
        </h1>
        <p className="text-gray-400 mt-2">
          Select a date to manage your tasks
        </p>
      </div>
      <Calendar onDateClick={handleDateClick} />
    </div>
  );
};

export default Home;