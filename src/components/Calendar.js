import React from "react";

const Calendar = ({ onDateClick }) => {
  const dates = Array.from({ length: 30 }, (_, i) => `2024-02-${String(i + 1).padStart(2, "0")}`);

  return (
    <div className="grid grid-cols-7 gap-3 p-4">
      {dates.map((date) => (
        <button key={date} onClick={() => onDateClick(date)} className="card p-3 text-lg cursor-pointer">
          {date}
        </button>
      ))}
    </div>
  );
};

export default Calendar;
