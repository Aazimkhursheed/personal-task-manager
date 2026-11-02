# Implementation Log - Personal Task Manager

This log tracks all setup steps, executed commands, installed packages, file changes, and architectural decisions made across the lifecycle of the project.

---

## [Task 1 & Task 2] Project Initialization & Context Setup
**Date**: 2026-11-02  
**Status**: Completed

### 1. Goals & Scope
- Initialize Git repository at root.
- Set up project structure: `frontend/`, `backend/`, and `project-context/`.
- Scaffold React + Vite frontend.
- Initialize Node.js Express backend.
- Configure `backend/.env.example` and `.gitignore` to prevent credential exposure.
- Write comprehensive context documentation for interview readiness.
- Strictly adhere to beginner-friendly MERN principles (no premature CRUD implementation).

---

### 2. Commands Executed
| # | Working Directory | Command | Purpose | Result |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `c:\Users\hp\Desktop\task-manager` | `git init` | Initialize Git repository in root | Success (`Initialized empty Git repository`) |
| 2 | `c:\Users\hp\Desktop\task-manager` | `npx -y create-vite@latest --help` | Inspect create-vite CLI flags | Success |
| 3 | `c:\Users\hp\Desktop\task-manager` | `npx -y create-vite@latest frontend --template react` | Scaffold React + Vite frontend | Success (Scaffolded Vite React template) |
| 4 | `c:\Users\hp\Desktop\task-manager\backend` | `npm install express mongoose dotenv cors` | Install backend runtime dependencies | Success (86 packages, 0 vulnerabilities) |
| 5 | `c:\Users\hp\Desktop\task-manager\backend` | `npm install -D nodemon` | Install backend live-reloading dev dependency | Success (26 packages added) |
| 6 | `c:\Users\hp\Desktop\task-manager\frontend` | `npm install` | Install frontend React + Vite dependencies | Success (24 packages, 0 vulnerabilities) |
| 7 | `c:\Users\hp\Desktop\task-manager\frontend` | `npm run build` | Validate frontend production build | Success (`✓ built in 264ms`) |
| 8 | `c:\Users\hp\Desktop\task-manager\backend` | `node -c server.js` | Validate backend syntax | Success (No syntax errors) |
| 9 | `c:\Users\hp\Desktop\task-manager` | `git check-ignore -v backend/.env ...` | Verify gitignore rules | Success (`.env` and `node_modules` ignored) |
| 10 | `c:\Users\hp\Desktop\task-manager` | `git add . ; git commit -m "..."` | Create initial baseline commit | Success (`[master (root-commit) 07e9f70]`) |

---

## [Part 1] Backend Implementation & Verification
**Date**: 2026-11-02  
**Status**: Completed & 100% Passing

### 1. Goals & Scope
- Implement MongoDB connection function via Mongoose reading `MONGO_URI` from `.env`.
- Implement Mongoose `Task` schema with title, description, priority enum, status enum, dueDate, and createdAt.
- Implement controller functions for all 5 CRUD endpoints:
  - `POST /tasks`: Create task with input validation.
  - `GET /tasks`: Get all tasks with status filtering, dueDate sorting, and priority sorting.
  - `GET /tasks/:id`: Get single task with ObjectId and 404 validation.
  - `PUT /tasks/:id`: Update any task field with validation.
  - `DELETE /tasks/:id`: Delete task with ObjectId and 404 validation.
- Implement global error handling middleware in `middleware/errorMiddleware.js`.
- Mount routes cleanly in `routes/taskRoutes.js` and `server.js`.
- Prevent stack trace leakage to clients.
- Verify server startup, MongoDB connection, and all 5 API endpoints against edge cases.

---

### 2. Files Created & Modified

| File | Status | Description |
| :--- | :--- | :--- |
| `backend/config/db.js` | Created | Standalone MongoDB connection function with Mongoose and process error termination. |
| `backend/models/Task.js` | Created | Mongoose schema with `priority` (`low`, `medium`, `high`) and `status` (`todo`, `in_progress`, `done`) enums and defaults. |
| `backend/controllers/taskController.js` | Created | Full CRUD business logic, validation for empty titles, invalid enums, invalid ObjectIds, and custom priority sorting. |
| `backend/routes/taskRoutes.js` | Created | Express router mapping `/` to `POST`/`GET` and `/:id` to `GET`/`PUT`/`DELETE`. |
| `backend/middleware/errorMiddleware.js` | Created | Centralized error handler managing Mongoose `CastError`, `ValidationError`, and safe client JSON without stack traces. |
| `backend/server.js` | Modified | Wired up `connectDB()`, CORS, JSON parser, route mountings (`/tasks` & `/api/tasks`), and error middleware. |
| `backend/.env` | Created | Configured with `PORT=5000` and `MONGO_URI=mongodb://127.0.0.1:27017/taskmanager` (ignored by Git). |

---

### 3. Automated API Test Suite & Verification Results

A comprehensive test suite was executed against the running backend on port 5000:

| # | Test Case Description | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `GET /api/health` | `200 OK`, `success: true` | `200 OK` | PASSED |
| 2 | `POST /tasks` with empty title (`" "`) | `400 Bad Request`, `Title is required` | `400 Bad Request` | PASSED |
| 3 | `POST /tasks` with invalid priority (`"urgent"`) | `400 Bad Request`, `Invalid priority` | `400 Bad Request` | PASSED |
| 4 | `POST /tasks` with invalid status (`"archived"`) | `400 Bad Request`, `Invalid status` | `400 Bad Request` | PASSED |
| 5 | `POST /tasks` valid Task 1 (High priority, todo) | `201 Created`, task object returned | `201 Created` | PASSED |
| 6 | `POST /tasks` valid Task 2 (Low priority, in_progress) | `201 Created`, task object returned | `201 Created` | PASSED |
| 7 | `POST /tasks` valid Task 3 (Medium priority, done) | `201 Created`, task object returned | `201 Created` | PASSED |
| 8 | `GET /tasks` retrieve all tasks | `200 OK`, count >= 3 | `200 OK`, count: 3 | PASSED |
| 9 | `GET /tasks?status=todo` filter by status | `200 OK`, only `todo` tasks returned | `200 OK`, filtered | PASSED |
| 10 | `GET /tasks?sortBy=priority` rank priority | `200 OK`, order: `high` > `medium` > `low` | `200 OK`, `['high', 'medium', 'low']` | PASSED |
| 11 | `GET /tasks?sortBy=dueDate` sort by dueDate | `200 OK`, chronological order | `200 OK`, sorted | PASSED |
| 12 | `GET /tasks/:id` retrieve valid task | `200 OK`, single task returned | `200 OK`, matched ID | PASSED |
| 13 | `GET /tasks/invalid-id-123` invalid ObjectId | `400 Bad Request`, `Invalid task ID format` | `400 Bad Request` | PASSED |
| 14 | `GET /tasks/507f1f77bcf86cd799439011` nonexistent task | `404 Not Found`, `Task not found` | `404 Not Found` | PASSED |
| 15 | `PUT /tasks/:id` update status and priority | `200 OK`, updated task returned | `200 OK`, updated | PASSED |
| 16 | `PUT /tasks/:id` update with empty title | `400 Bad Request`, `Title cannot be empty` | `400 Bad Request` | PASSED |
| 17 | `DELETE /tasks/:id` delete existing task | `200 OK`, `Task deleted successfully` | `200 OK` | PASSED |
| 18 | `GET /tasks/:id` after deletion | `404 Not Found` | `404 Not Found` | PASSED |

**Summary**: 18 of 18 test assertions passed with 0 failures.

---

### 4. Issues Encountered & Resolved
1. **Mongoose 8+ Deprecation Warning**:
   - *Issue*: Using `new: true` in `Task.findByIdAndUpdate` triggers a deprecation warning in Mongoose 8.
   - *Resolution*: Updated to modern standard `returnDocument: 'after'` with `runValidators: true`.
2. **Priority Ordering Logic**:
   - *Issue*: Standard alphabetical sorting on string priorities results in `high -> low -> medium`.
   - *Resolution*: Created a rank lookup map `{ high: 1, medium: 2, low: 3 }` ensuring intuitive priority order.
