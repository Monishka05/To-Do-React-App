import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.scss'; // Import SCSS file

// Define Task interface
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Define TodoList functional component
const TodoList: React.FC = () => {
  // Define state variables for tasks, new task title, new task description, and filter
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Function to add a new task
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle.trim(),
        description: newTaskDescription?.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  // Function to handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  // Function to handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(e.target.value);
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Function to toggle task completion status
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to filter tasks based on completion status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  // Return JSX for TodoList component
  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={handleTitleChange}
          placeholder="Add task"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={handleDescriptionChange}
          placeholder="Task description"
        />
        <button onClick={addTask}>+</button>
      </div>
      <div className="filter-buttons">
        <button className={`all-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`active-button ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`completed-button ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

// Export TodoList component
export default TodoList;
