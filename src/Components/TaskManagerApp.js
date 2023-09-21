import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Box, Button, Card, Dialog, DialogTitle } from '@mui/material';

function TaskManagerApp() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskToEdit(null);
  };

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
      <h1 className="App-header">Task Manager</h1>
      <Box display="flex" justifyContent="flex-end" className="button">
        <Button variant="contained" onClick={handleClickOpen}>
          Create Task
        </Button>
      </Box>
      <TaskList
          tasks={tasks}
          removeTask={removeTask}
          setTaskToEdit={setTaskToEdit}
          handleClickOpen={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Enter the task details
        </DialogTitle>
        <Card className="card">
          <TaskForm addTask={addTask} editTask={editTask} initialTask={taskToEdit} handleClose={handleClose} />
        </Card>
      </Dialog>
    </div>
  );
}

export default TaskManagerApp;
