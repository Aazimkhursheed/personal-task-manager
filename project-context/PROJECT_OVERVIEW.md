# Project Overview - Personal Task Manager

## 1. Introduction
The **Personal Task Manager** is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It is designed as a clean, practical company interview assignment demonstrating fundamental full-stack web development competencies, clean code organization, and reliable RESTful communication.

---

## 2. Project Goals
- **Simplicity & Readability**: Clean, beginner-friendly code without convoluted design patterns or excessive abstractions.
- **Clear Separation of Concerns**: Decoupled frontend (client) and backend (server) operating independently.
- **Easy to Explain**: Every component, route, and database query is written such that any developer can easily explain it in an interview.
- **Robust Core Capabilities**: Reliable CRUD operations (Create, Read, Update, Delete) for managing everyday personal tasks.
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
+-----------------------------------------------------------+
                             |
                       Mongoose ODM
                             v
+-----------------------------------------------------------+
|                   Database (Cloud)                        |
|                    MongoDB Atlas                          |
+-----------------------------------------------------------+
```

---

## 4. Planned Core Features
1. **Task List View**: Display tasks with status, priority, and creation dates.
2. **Add New Task**: Simple form with validation for task title and optional details.
3. **Toggle Completion**: Fast one-click status toggle between *Pending* and *Completed*.
4. **Edit Task**: Modify title, description, or status of existing tasks.
5. **Delete Task**: Remove a task with confirmation to prevent accidental loss.
6. **Task Filtering**: Filter tasks by status (All, Pending, Completed).

---

## 5. Folder Structure Outline
```
task-manager/
├── backend/            # Express.js REST API server
├── frontend/           # React + Vite client application
├── project-context/    # Comprehensive architectural and interview documentation
├── .gitignore          # Root-level ignore rules for node_modules and .env files
└── README.md           # Project guide and startup instructions
```
