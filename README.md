# To-Do Application

This project is a To-Do application built with React.js, TypeScript, Node.js, Express.js, and MySQL. It allows users to manage their tasks with features like adding, editing, deleting, marking as complete/incomplete, and searching for tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Siddhiiiiiiii/To-Do-Application.git
   cd To-Do-Application

2. **Install dependencies:**

Navigate to the frontend and backend directories separately and install dependencies.

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

3. **Set up MySQL Database:**
   a. Install MySQL 8 if not already installed.
   b. Create a new database named todo_app.
   c. Configure your database connection settings in 'backend/config/database.js'

4. **Run Backend Server:**
   Start the Node.js server for the backend.
   cd backend
   npm start
   The backend server will start on http://localhost:3000

5. **Run Frontend Application:**
   Start the React development server for the frontend.
   cd ../frontend
   npm start
   The frontend development server will start on http://localhost:3001

6. **Access the Application:**
    Open your web browser and go to http://localhost:3000 to access the To-Do Application.

## Usage
• Adding a New Todo:
  •	Click on the "Add Todo" button.
  • Enter the title, description, and due date (optional) for the new task.
  • Click "Save" to add the todo.

• Editing a Todo:
  • Click on the todo item you want to edit.
  • Update the title, description, or due date.
  • Click "Save" to update the todo.

• Deleting a Todo:
  • Click on the delete icon next to the todo item you want to delete.

• Marking Todo as Complete/Incomplete:
  • Click on the checkbox next to the todo item to mark it as complete or incomplete.

• Searching for Todos:
  • Use the search bar to enter keywords.
  • The todo list will dynamically filter based on the search input.

## Technologies Used
• Frontend:
  • React.js
  • TypeScript
  • CSS (for styling)

• Backend:
  • Node.js
  • Express.js
  • MySQL

## Folder Structure

To-Do-Application/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── index.js
│   │   └── todoController.js
│   ├── models/
│   │   ├── index.js
│   │   └── ToDo.js
│   ├── routes/
│   │   └── ToDo.js
│   ├── Dockerfile
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── TodoList.tsx
│   │   ├── styles/
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── .gitignore
├── docker-compose.yml
└── README.md

## API Endpoints
• GET /api/todos: Fetch all todos.
• POST /api/todos: Create a new todo.
• PUT /api/todos/:id: Update an existing todo.
• DELETE /api/todos/:id: Delete a todo by ID.

For detailed API documentation and usage, refer to the backend's routes/ToDo.js file.


