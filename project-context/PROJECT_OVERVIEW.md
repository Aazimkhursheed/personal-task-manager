# Project Overview - Personal Task Manager

## 1. Introduction
The **Personal Task Manager** is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It is designed as a clean, practical company interview assignment demonstrating fundamental full-stack web development competencies, clean code organization, and reliable RESTful communication.

---

## 2. Project Goals
- **Simplicity & Readability**: Clean, beginner-friendly code without convoluted design patterns or excessive abstractions.
- **Clear Separation of Concerns**: Decoupled frontend (client) and backend (server) operating independently.
- **Easy to Explain**: Every component, route, and database query is written such that any developer can easily explain it in an interview.
- **Robust Core Capabilities**: Complete RESTful CRUD operations (Create, Read, Update, Delete) with filtering and sorting for managing everyday personal tasks.
- **Safe Configuration**: Strict environment variable isolation using `.env` and `.env.example`.

---

## 3. High-Level Architecture
```
+-----------------------------------------------------------+
|                   Client (Frontend)                       |
|               React (Vite) + Vanilla CSS                  |
+-----------------------------------------------------------+
                             |
                   HTTP / REST (JSON)
                   (via Native Fetch)
                             v
+-----------------------------------------------------------+
|                   Server (Backend)                        |
|               Node.js + Express.js                        |
|   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐  |
|   │ taskRoutes  │->│taskControl'r│->│ Mongoose Models  │  |
|   └─────────────┘  └─────────────┘  └──────────────────┘  |
|   ┌────────────────────────────────────────────────────┐  |
|   │ Global Error & 404 Middleware                      │  |
|   └────────────────────────────────────────────────────┘  |
+-----------------------------------------------------------+
                             |
                       Mongoose ODM
                             v
+-----------------------------------------------------------+
|                   Database (Cloud/Local)                  |
|                    MongoDB / Atlas                        |
+-----------------------------------------------------------+
```

---

## 4. Implemented Backend Features (Part 1)
1. **Mongoose Task Model**:
   - `title`: String, required, trimmed.
   - `description`: String, optional.
   - `priority`: Enum `['low', 'medium', 'high']`, default `'medium'`.
   - `status`: Enum `['todo', 'in_progress', 'done']`, default `'todo'`.
   - `dueDate`: Date, optional.
   - `createdAt`: Date, default timestamp.
2. **REST Endpoints**:
   - `POST /tasks`: Create a new task with input validation.
   - `GET /tasks`: Retrieve all tasks, supporting status filtering (`?status=todo`) and sorting by `dueDate` or `priority`.
   - `GET /tasks/:id`: Retrieve a specific task by ID with ObjectId validation.
   - `PUT /tasks/:id`: Update task fields with input validation.
   - `DELETE /tasks/:id`: Delete a task by ID.
3. **Validation & Error Handling**:
   - Rejection of empty titles, invalid priorities, and invalid statuses (`400 Bad Request`).
   - Rejection of malformed MongoDB ObjectIDs (`400 Bad Request`).
   - Clean `404 Not Found` responses when tasks or routes do not exist.
   - Centralized error-handling middleware preventing stack trace leakage to clients.

---

## 5. Folder Structure
```
task-manager/
├── backend/                  # Express.js REST API server
│   ├── config/
│   │   └── db.js             # Mongoose database connection
│   ├── controllers/
│   │   └── taskController.js # CRUD business logic & validation
│   ├── middleware/
│   │   └── errorMiddleware.js# 404 & centralized error handlers
│   ├── models/
│   │   └── Task.js           # Mongoose Task schema & validation
│   ├── routes/
│   │   └── taskRoutes.js     # REST route mappings
│   ├── .env                  # Local environment configuration
│   ├── .env.example          # Template environment configuration
│   ├── .gitignore            # Backend gitignore
│   ├── package.json          # Express, Mongoose, dotenv, cors, nodemon
│   └── server.js             # Express app entry point
├── frontend/                 # React + Vite client application
├── project-context/          # Complete architectural and interview docs
├── .gitignore                # Root-level ignore rules
└── README.md                 # Project guide and startup instructions
```
