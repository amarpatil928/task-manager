import React from 'react';
import TaskItem from './TaskItem';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TaskList({ tasks, removeTask, setTaskToEdit, handleClickOpen }) {
  return (
    <div className="task-list">
      {tasks && tasks.length ? '' : 'No Tasks...'}
      <>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="table-header">Task Details</TableCell>
                <TableCell className="table-header" align="left">Priority</TableCell>
                <TableCell className="table-header" align="left">Created</TableCell>
                <TableCell className="table-header" align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  index={index}
                  task={task}
                  removeTask={removeTask}
                  setTaskToEdit={setTaskToEdit}
                  handleClickOpen={handleClickOpen}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  );
}

export default TaskList;
