import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Tag, AlertTriangle, CheckCircle, ArrowDown } from 'lucide-react';

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'high':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'medium':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'low':
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const categories = [
  { value: 'DSA', label: 'Data Structures & Algorithms' },
  { value: 'System Design', label: 'System Design' },
  { value: 'Frontend', label: 'Frontend Development' },
  { value: 'Backend', label: 'Backend Development' }
];

const priorities = [
  { value: 'high', label: 'High Priority', color: 'text-red-500' },
  { value: 'medium', label: 'Medium Priority', color: 'text-yellow-500' },
  { value: 'low', label: 'Low Priority', color: 'text-blue-500' }
];

const TaskForm = ({ date, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('DSA');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { date, category, priority, title, description };

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks(prev => [...prev, data]);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto mt-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
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
            <div>
              <input
                type="text"
                className="input-field text-lg sm:text-xl font-medium"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <textarea
                className="input-field min-h-[100px]"
                placeholder="Add description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Tag className="w-4 h-4" />
                  Category
                </label>
                <div className="custom-select">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  Priority
                </label>
                <div className="custom-select">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-transparent"
                  >
                    {priorities.map(pri => (
                      <option key={pri.value} value={pri.value}>
                        {pri.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PriorityIcon priority={priority} />
                <span className={`priority-indicator priority-${priority}`}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn-primary bg-gray-600"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
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