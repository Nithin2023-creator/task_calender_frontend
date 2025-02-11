import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const Home = () => {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    navigate(`/tasks/${date}`);
  };

  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl mb-4">Task Tracker</h1>
      <Calendar onDateClick={handleDateClick} />
    </div>
  );
};

export default Home;
