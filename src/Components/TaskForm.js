import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editTask, initialTask }) {
  const [task, setTask] = useState(
    initialTask || { title: '', description: '', priority: 'low', completed: false }
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setTask(initialTask || { title: '', description: '', priority: 'low', completed: false });
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the title is not empty
    if (task.title.trim() === '') {
      setError('Task title cannot be empty.');
      return;
    }

    // Reset the error message
    setError('');

    if (!!initialTask) {
      // If in edit mode, call the editTask function
      editTask(initialTask.id, task);
    } else {
      // If in add mode, call the addTask function
      addTask({ ...task, id: Date.now() });
    }

    // Reset the form and switch back to add mode
    setTask({ title: '', description: '', priority: 'low', completed: false });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    label="Enter task title"
                    variant="outlined"
                    size="small"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    label="Enter task description"
                    variant="outlined"
                    size="small"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl sx={{ minWidth: 220 }} >
                    <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    size="small"
                    value={task.priority}
                    label="Priority"
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        {error && <p className="error-message">{error}</p>}
        <Button variant="contained" type="submit" sx={{ m: 1 }}>{!!initialTask ? 'Edit Task' : 'Add Task'}</Button>
    </form>
  );
}

export default TaskForm;
