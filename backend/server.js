// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

// Connect to the database
connectDB();

// CORS Configuration Options
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend's URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed methods
  credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200        // For legacy browsers (IE11, various SmartTVs) that choke on 204
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes here
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
