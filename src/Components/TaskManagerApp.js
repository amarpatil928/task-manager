import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Card, Divider } from '@mui/material';

function TaskManagerApp() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Load tasks from local storage when the app starts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  const addTask = (newTask) => {
    const updatedTasksArr = [...tasks];
    updatedTasksArr.push(newTask);
    setTasks(updatedTasksArr);
    localStorage.setItem('tasks', JSON.stringify(updatedTasksArr));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTaskToEdit(null);
  };

  return (
    <div className="task-manager-app">
      <Card sx={{ width: 500, padding: 4 }}>
        <h1 className="App-header">Task Manager</h1>
        <TaskForm addTask={addTask} editTask={editTask} initialTask={taskToEdit} />
        <Divider sx={{ m: 2 }} />
        <TaskList
            tasks={tasks}
            removeTask={removeTask}
            setTaskToEdit={setTaskToEdit}
        />
      </Card>
    </div>
  );
}

export default TaskManagerApp;
