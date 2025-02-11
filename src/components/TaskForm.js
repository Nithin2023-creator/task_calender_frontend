// TaskForm.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, Tag, AlertTriangle, CheckCircle, ChevronDown,  Check } from "lucide-react";

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case "high":
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case "medium":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "low":
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const categories = [
    { 
      value: "DSA", 
      label: "Data Structures & Algorithms",
      color: "text-purple-400"
    },
    { 
      value: "System Design", 
      label: "System Design",
      color: "text-green-400"
    },
    { 
      value: "Frontend", 
      label: "Frontend Development",
      color: "text-blue-400"
    },
    { 
      value: "Backend", 
      label: "Backend Development",
      color: "text-yellow-400"
    },
  ];
  
  const priorities = [
    { 
      value: "high", 
      label: "High Priority", 
      color: "text-red-400" 
    },
    { 
      value: "medium", 
      label: "Medium Priority", 
      color: "text-yellow-400"
    },
    { 
      value: "low", 
      label: "Low Priority", 
      color: "text-blue-400"
    },
  ];

const CustomDropdown = ({ options, selected, setSelected, label }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative" style={{ zIndex: 50 }}>
        {/* Trigger Button with Glossy Finish */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full bg-gray-800/70 backdrop-blur-md 
          text-gray-300 py-2 px-4 rounded-lg border border-gray-700/50 shadow-lg 
          hover:bg-gray-700/70 transition-all duration-200 group"
        >
          <span className="truncate">{options.find((opt) => opt.value === selected)?.label || label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
  
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop for closing dropdown */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="fixed left-0 right-0 mx-2 sm:mx-0 sm:absolute sm:left-0 sm:right-0 mt-2"
                style={{ zIndex: 1000 }}
              >
                <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 
                  rounded-lg shadow-xl overflow-hidden max-h-60">
                  {/* Search input can be added here if needed */}
                  <div className="overflow-y-auto py-1">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSelected(option.value);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-700/70 
                        transition-colors duration-150 flex items-center justify-between
                        ${option.value === selected ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300'}`}
                      >
                        <span className={`${option.color || ''}`}>{option.label}</span>
                        {option.value === selected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-4 h-4 text-blue-400" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };
  

const TaskForm = ({ date, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("DSA");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { date, category, priority, title, description };

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]);
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto mt-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative"
        style={{ zIndex: 40 }}
        onSubmit={handleSubmit}
      >
        {!isExpanded ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="input-field flex-grow"
              placeholder="Quick add task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="btn-primary p-2 sm:p-3"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              className="input-field text-lg sm:text-xl font-medium"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="input-field min-h-[100px]"
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2" style={{ zIndex: 51 }}>
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Tag className="w-4 h-4" />
                  Category
                </label>
                <CustomDropdown
                  options={categories}
                  selected={category}
                  setSelected={setCategory}
                  label="Select Category"
                />
              </div>

              <div className="space-y-2" style={{ zIndex: 50 }}>
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  Priority
                </label>
                <CustomDropdown
                  options={priorities}
                  selected={priority}
                  setSelected={setPriority}
                  label="Select Priority"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <PriorityIcon priority={priority} />
                <span className={`priority-indicator priority-${priority}`}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn-primary bg-gray-600 flex-1 sm:flex-initial"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 sm:flex-initial">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default TaskForm;