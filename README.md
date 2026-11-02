# Personal Task Manager

## Description
Personal Task Manager is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, view, organize, and delete daily tasks across three distinct stages: Todo, In Progress, and Done. The project follows a clean client-server architecture with an Express REST API backend and a responsive React frontend.

## Technologies Used
- Frontend: React 19, Vite, Vanilla CSS, native Fetch API
- Backend: Node.js, Express.js, Mongoose, dotenv, cors
- Database: MongoDB Atlas (or local MongoDB)
- Development Tools: Git, npm, nodemon

## Main Features
- Three-Column Dashboard: Tasks are organized into Todo, In Progress, and Done sections.
- Task Creation: Form to add new tasks with title, description, priority (low, medium, high), and due date.
- Instant Status Updates: Dropdown on each task card to change status immediately without reloading the page.
- Task Deletion: Option to delete tasks permanently from both the database and the dashboard.
- Input Validation: Client-side and server-side checks to reject empty titles and invalid enum values.
- Error Handling: Centralized Express error-handling middleware and frontend alert banners.

## Project Structure
```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskColumn.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── NOTES.md
└── README.md
```

## Installation Instructions

1. Open your terminal in the root project folder.

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## MongoDB Environment Configuration

1. In the backend directory, create a `.env` file from `.env.example`:
```bash
cd backend
copy .env.example .env
```
*(On macOS or Linux, use: `cp .env.example .env`)*

2. Open `backend/.env` in your code editor and enter your MongoDB connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Example for MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
```

Example for local MongoDB:
```env
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
```

## How to Run

### 1. Start the Backend Server
In your first terminal:
```bash
cd backend
npm run dev
```
The server will start at `http://localhost:5000`.

### 2. Start the Frontend Application
In a second terminal:
```bash
cd frontend
npm run dev
```
Open your browser and visit `http://localhost:5173`.
