import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow } from '@mui/material';

function TaskItem({ task, index, removeTask, setTaskToEdit, handleClickOpen }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpen(false);
    setTaskToEdit(null);
  };
  const handleEdit = () => {
    handleClickOpen();
    setTaskToEdit(task);
  };

  const handleDeleteTask = () => {
    removeTask(task.id);
    toast.success('Task deleted successfully');
  };

  const dateFormater = new Date(task.id).toDateString();

  return (
    <>
      <TableRow
        key={task.id}
        className="task-bg"
      >
        <TableCell component="th" scope="row">
          <div><span>{index + 1}.</span> {task.title}</div>
          <div className="task-description">
            <span>Description: </span>
            <span>{task.description}</span>
          </div>
        </TableCell>
        <TableCell align="left">{task.priority}</TableCell>
        <TableCell align="left">{dateFormater}</TableCell>
        <TableCell align="left">
          <div>
            <IconButton color="primary" aria-label="delete" onClick={handleEdit}>
              <EditIcon size='small' />
            </IconButton>
            <IconButton color="primary" aria-label="delete" onClick={handleClickOpenDelete}>
              <DeleteIcon size='small' />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteTask} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskItem;
