import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function TaskItem({ task, index, removeTask, setTaskToEdit }) {
  const handleEdit = () => {
    setTaskToEdit(task);
  };

  return (
    <div className="task-item task-bg">
      <div className="task-title">
        <div><span>{index + 1}.</span> {task.title}</div>
        <div>
          <IconButton color="primary" aria-label="delete" onClick={handleEdit}>
            <EditIcon size='small' />
          </IconButton>
          <IconButton color="primary" aria-label="delete" onClick={() => removeTask(task.id)}>
            <DeleteIcon size='small' />
          </IconButton>
        </div>
      </div>
      <div className="task-description">
        <span>Description: </span>
        <span>{task.description}</span>
      </div>
    </div>
  );
}

export default TaskItem;
