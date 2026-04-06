//Smart Task Manager//
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks((prev) => [
      ...prev,
      { text: task, completed: false }
    ]);

    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((t, i) =>
        i === editIndex ? { ...t, text: editText } : t
      )
    );
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>Smart Task Manager </h1>

      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
      </button>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={saveEdit}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`task-text ${t.completed ? "completed" : ""
                    }`}
                  onClick={() => toggleTask(index)}
                >
                  {t.text}
                </span>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(index)}
                  >
                    EDIT
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(index)}
                  >
                    DELETE
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;