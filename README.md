# Task Management App

## Presentation
For a detailed presentation of the project, check out our YouTube video: [Task Management App Presentation](https://youtu.be/CaXiAtc2EII)

## Project Overview

The Task Management App is a full-stack application developed using the MERN stack (MongoDB, Express, React, and Node.js). This app is designed to help users manage their tasks efficiently, offering features such as task creation, updating, deletion, and user authentication. It serves as a practical tool for organizing daily tasks, ensuring users can keep track of their to-dos in a structured and secure manner.

## Project Goals

- Develop a full-stack application that allows users to create an account, log in, and manage their tasks.
- Implement secure authentication and authorization to protect user data.
- Ensure a user-friendly interface that allows easy navigation and task management.

## Backend Code Overview

- **`server.js`**: Sets up the server, connects to MongoDB, configures middleware, and defines routes for handling API requests.
- **`db.js`**: Manages the connection to MongoDB, ensuring that the database is connected properly and handles any connection errors.
- **`authController.js`**: Handles user registration and login, generating JWT tokens for authenticated sessions.
- **`taskController.js`**: Manages CRUD operations for tasks, ensuring that each task is associated with the correct user.
- **`authMiddleware.js`**: Protects routes by verifying JWT tokens, ensuring that only authenticated users can access certain features.
- **`userModel.js`**: Defines the User schema, including password hashing and verification methods.
- **`taskModel.js`**: Defines the Task schema, linking each task to a user and storing task details such as title and description.
- **`generateToken.js`**: Generates JWT tokens for user authentication, which expire after 30 days.
- **`errorHandler.js`**: Provides centralized error handling, ensuring consistent responses for errors across the API.

## Frontend Code Overview

- **`index.html`**: The entry point for the React app, setting up the root element where the app is rendered.
- **`App.js`**: Manages the main application routing, rendering different components based on the user's navigation.
- **`Header.js`**: Contains the navigation bar with links to different parts of the app, including tasks, login, and registration.
- **`TaskPage.js`**: Displays the main task management interface, allowing users to view, add, edit, and delete tasks.
- **`LoginPage.js`**: Provides the login form, allowing users to authenticate and access their tasks.
- **`RegisterPage.js`**: Handles user registration, creating new accounts and redirecting users to the task page upon success.
- **`TaskEditPage.js`**: Allows users to edit an existing task, pre-populating fields with the current task data.
- **`TaskItem.js`**: Renders individual task items within the task list, displaying task details and actions.
- **`TaskPage.css` & `App.css`**: Styles the app's components, ensuring a consistent and attractive user interface.

## Conclusion and Future Enhancements

- **Current Status**: The Task Management App is fully functional, providing essential task management features with secure user authentication.
- **Future Enhancements**:
  - Adding features like task prioritization, due dates, and reminders for better task management.
  - Developing a more detailed analytics dashboard to track task completion trends.
  - Implementing real-time collaboration features for team-based task management.


Feel free to explore the code and contribute to the project!
