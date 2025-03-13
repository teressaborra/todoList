// filepath: c:\Users\syama\mern\ToDo\server\index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskroutes');

const app = express();

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});