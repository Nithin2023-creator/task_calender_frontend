import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import "./styles/darkTheme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:date" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
