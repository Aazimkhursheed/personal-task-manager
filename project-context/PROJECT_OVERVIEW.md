# Project Overview - Personal Task Manager

## 1. Introduction
The **Personal Task Manager** is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It is designed as a clean, practical company interview assignment demonstrating fundamental full-stack web development competencies, clean code organization, and reliable RESTful communication.

---

## 2. Project Goals
- **Simplicity & Readability**: Clean, beginner-friendly code without convoluted design patterns or excessive abstractions.
- **Clear Separation of Concerns**: Decoupled frontend (client) and backend (server) operating independently.
- **Easy to Explain**: Every component, route, and database query is written such that any developer can easily explain it in an interview.
- **Robust Core Capabilities**: Complete RESTful CRUD operations (Create, Read, Update, Delete) with filtering, sorting, and 3-column status workflow.
- **Safe Configuration**: Strict environment variable isolation using `.env` and `.env.example`.

---

## 3. High-Level Architecture
```
+-----------------------------------------------------------+
|                   Client (Frontend)                       |
|          React 19 (Vite) + Vanilla CSS                    |
|                                                           |
|   ┌───────────────────────────────────────────────────┐   |
|   │ App.jsx (Root State: tasks, loading, error)       │   |
|   └───────────────────────────────────────────────────┘   |
|         │                  │                  │           |
|         ▼                  ▼                  ▼           |
|    [Navbar.jsx]      [TaskForm.jsx]     [TaskColumn.jsx]  |
|                                               │           |
|                                               ▼           |
|                                         [TaskCard.jsx]    |
|                                               │           |
|                                               ▼           |
|                                  [services/api.js (fetch)]|
+-----------------------------------------------------------+
                             |
                   HTTP / REST (JSON)
              (Base URL: http://localhost:5000/tasks)
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

## 4. Implemented Features Summary

### Part 1: Backend (Complete)
- **Mongoose Task Schema**: `title`, `description`, `priority` (`low`, `medium`, `high`), `status` (`todo`, `in_progress`, `done`), `dueDate`, `createdAt`.
- **REST Endpoints**: `POST /tasks`, `GET /tasks` (with filtering and sorting), `GET /tasks/:id`, `PUT /tasks/:id`, `DELETE /tasks/:id`.
- **Validation**: Strict rejection of empty titles, invalid enums, and malformed ObjectIds.
- **Error Middleware**: Centralized error and 404 handlers without stack trace leakage.
- **DNS Resolver**: Automatic public DNS resolution (`dns.setServers(['1.1.1.1'])`) for MongoDB Atlas SRV records.

### Part 2: Frontend (Complete)
- **Dashboard Layout**: Clean, responsive layout with Navbar displaying total and completed task counts.
- **Three Status Columns**:
  - **Todo**: Tasks waiting to be started.
  - **In Progress**: Tasks actively being worked on.
  - **Done**: Completed tasks.
- **Task Creation Form**:
  - Title (required, with client-side validation).
  - Priority selector (`low`, `medium`, `high`).
  - Due date picker (formatted into readable date strings).
  - Description textarea.
- **Interactive Task Cards**:
  - Colored priority badges and left-border accents (High: red, Medium: amber, Low: green).
  - Status dropdown allowing instant transition between any of the 3 sections.
  - Delete action to remove tasks.
- **Real-Time State Synchronization**: React `useState` updates local state immediately upon API response without requiring manual page refresh.
- **Error & Loading Feedback**: Visual loading spinner and dismissible error and success alert banners.

---

## 5. Folder Structure
```
task-manager/
├── backend/                  # Express.js REST API server
│   ├── config/
│   │   └── db.js             # Mongoose database connection (with DNS fix)
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
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Header with title and stats
│   │   │   ├── TaskForm.jsx  # Creation form with validation
│   │   │   ├── TaskColumn.jsx# Status column wrapper
│   │   │   └── TaskCard.jsx  # Card with status select & delete
│   │   ├── services/
│   │   │   └── api.js        # Native fetch API integration
│   │   ├── App.css           # Clean dashboard styling
│   │   ├── App.jsx           # Main dashboard container & state
│   │   ├── index.css         # Global reset and typography
│   │   └── main.jsx          # React DOM entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── project-context/          # Complete architectural and interview docs
├── .gitignore                # Root-level ignore rules
└── README.md                 # Project guide and startup instructions
```
