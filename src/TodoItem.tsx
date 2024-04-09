import React from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onToggleComplete }) => {
  return (
    <li className="todo-item">
      <div className="todo-item-details">
        <div className="todo-item-title">{task.title}</div>
        {task.description && <div className="todo-item-description">Description: {task.description}</div>}
      </div>
      <div className="todo-item-buttons">
        <button className="todo-item-button" onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button className="todo-item-button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
