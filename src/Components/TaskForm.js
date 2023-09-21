import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function TaskForm({ addTask, editTask, initialTask, handleClose }) {
  const [task, setTask] = useState(
    initialTask || { title: '', description: '', priority: 'Low', completed: false }
  );
  const [error, setError] = useState('');

  useEffect(() => {
    setTask(initialTask || { title: '', description: '', priority: 'Low', completed: false });
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the title is not empty
    if (task.title.trim() === '') {
      setError('Please enter title');
      return;
    }

    // Reset the error message
    setError('');

    if (!!initialTask) {
      // If in edit mode, call the editTask function
      editTask(initialTask.id, task);
      toast.success('Task updated successfully');
      handleClose();
    } else {
      // If in add mode, call the addTask function
      addTask({ ...task, id: Date.now() });
      toast.success('Task created successfully');
      handleClose();
    }

    // Reset the form and switch back to add mode
    setTask({ title: '', description: '', priority: 'Low', completed: false });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    label="Enter title"
                    variant="outlined"
                    size="small"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                 {error && !task.title && <p className="error-message">{error}</p>}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    label="Enter description"
                    variant="outlined"
                    size="small"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl className="select-field" >
                    <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    size="small"
                    value={task.priority}
                    label="Priority"
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" className="button">
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" type="submit">{!!initialTask ? 'Edit Task' : 'Add Task'}</Button>
        </Box>
    </form>
  );
}

export default TaskForm;
