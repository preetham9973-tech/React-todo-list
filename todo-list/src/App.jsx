import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  // Store task input
  const [task, setTask] = useState("");

  // Get tasks from LocalStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks in LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Mark task as completed
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="container">

      <h1>React ToDo App</h1>

      {/* Add Task Section */}
      <div className="input-section">

        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>

      {/* Task List */}
      <div className="task-list">

        {tasks.map((item) => (

          <div className="task-item" key={item.id}>

            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTask(item.id)}
            />

            <span
              className={item.completed ? "completed" : ""}
            >
              {item.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteTask(item.id)}
            >
              Delete
            </button>

          </div>

        ))}

        {tasks.length === 0 && (
          <p className="empty-message">
            No tasks added yet!
          </p>
        )}

      </div>

    </div>
  );
}

export default App;