import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home.css'; // Correctly import the CSS file

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://todolist-n6vv.onrender.com/tasks');
        setTasks(response.data);
        console.log('Fetched Data:', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await axios.post('https://todolist-n6vv.onrender.com/tasks', newTask);
      console.log('Added Task:', response.data);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', status: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
await axios.delete(`https://todolist-n6vv.onrender.com/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await axios.put(`https://todolist-n6vv.onrender.com/tasks/${id}`, editingTask);
      console.log('Updated Task:', response.data);
      setTasks(tasks.map(task => (task._id === id ? response.data.task : task)));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  return (
    <div className="container">
      <h2>Task Management App</h2>
  <div className="add-task">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <button onClick={addTask}>Add Task</button>
      </div>


    
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => handleEditClick(task)}>Edit</button> 
            </div>
            {editingTask && editingTask._id === task._id && (
              <div className="editing">
                <input
                  type="text"
                  name="title"
                  value={editingTask.title}
                  onChange={handleEditInputChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="description"
                  value={editingTask.description}
                  onChange={handleEditInputChange}
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="status"
                  value={editingTask.status}
                  onChange={handleEditInputChange}
                  placeholder="Status"
                />
                <button onClick={() => updateTask(task._id)}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default Home;
