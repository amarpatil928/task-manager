import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, removeTask, setTaskToEdit }) {
  return (
    <div className="task-list">
      {tasks && tasks.length ? '' : 'No Tasks...'}
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          removeTask={removeTask}
          setTaskToEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
