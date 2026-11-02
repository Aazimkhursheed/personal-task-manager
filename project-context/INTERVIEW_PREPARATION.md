# Interview Preparation Guide - Personal Task Manager

This guide covers essential technical concepts, common interview questions, and clear, practical answers you can reference when explaining this MERN application during an interview.

---

## 1. High-Level Architecture Explanation
**Question**: *"Can you walk me through the high-level architecture of your project?"*

**Answer**:
> "This is a full-stack MERN application split into two main parts:
> 1. **Client (Frontend)**: Built with React and Vite. It renders the UI, manages client-side state using React hooks (`useState`, `useEffect`), and makes asynchronous HTTP requests using the native `fetch` API.
> 2. **Server (Backend)**: Built with Node.js and Express. It serves a RESTful API, handles request validation, and talks to MongoDB Atlas using Mongoose models.
> 
> The frontend and backend run as independent processes (Frontend on port `5173`, Backend on port `5000`). They communicate over HTTP with JSON payloads, and CORS is enabled on the backend so the browser allows the requests."

---

## 2. Backend Architecture & Design Questions

### Q1: Why did you separate routes and controllers into different folders?
- **Answer**: "Separating routes and controllers follows the Single Responsibility Principle. 
  - The **route file** (`taskRoutes.js`) only defines the HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and paths (`/tasks`, `/tasks/:id`).
  - The **controller file** (`taskController.js`) contains the actual business logic, request validation, database interactions, and response formatting.
  This makes the code modular, readable, and much easier to unit-test and debug."

### Q2: How does MongoDB connection work in this project?
- **Answer**: "We created a dedicated `connectDB()` function in `backend/config/db.js`. It uses `mongoose.connect(process.env.MONGO_URI)`. Because connecting to a database is an asynchronous network operation, we wrap it in an `async/await` block. If connection succeeds, we log the host. If it fails, we catch the error, log a descriptive message, and call `process.exit(1)` to terminate the process safely rather than running in an invalid state."

### Q3: How do you handle invalid MongoDB IDs?
- **Answer**: "MongoDB uses 24-character hexadecimal `ObjectId` strings. If a client sends an invalid ID like `/tasks/123`, querying MongoDB directly will throw a Mongoose `CastError`. To provide an instant, clean response, we check `mongoose.Types.ObjectId.isValid(req.params.id)` right inside the controller. If it is invalid, we immediately return `400 Bad Request` with `{ success: false, message: 'Invalid task ID format' }`. In addition, our global error middleware is configured to catch any unhandled `CastError`."

### Q4: How does status filtering and sorting work in `GET /tasks`?
- **Answer**: "Clients pass query parameters in the URL, for example `GET /tasks?status=todo&sortBy=dueDate&order=asc`.
  - **Filtering**: We read `req.query.status`. If provided, we validate that it matches one of `['todo', 'in_progress', 'done']` and pass it to Mongoose: `Task.find({ status })`.
  - **Due Date Sorting**: If `req.query.sortBy === 'dueDate'`, we use Mongoose `.sort({ dueDate: order === 'desc' ? -1 : 1 })`.
  - **Priority Sorting**: Alphabetical sorting fails for priorities because `'low'` comes before `'medium'`. So we map priorities to numerical ranks (`{ high: 1, medium: 2, low: 3 }`) and sort the tasks logically so high-priority tasks always appear first."

### Q5: How does Express centralized error handling work?
- **Answer**: "Express recognizes error-handling middleware by its 4 arguments: `(err, req, res, next)`. Whenever a controller encounters an unexpected exception inside a `catch` block, it calls `next(error)`. Express skips all remaining routes and invokes our `errorHandler` in `errorMiddleware.js`. The middleware determines the proper HTTP status code, formats a clean JSON response `{ success: false, message }`, and deliberately avoids returning raw stack traces to the client for security."

### Q6: Why do we never return raw stack traces to clients?
- **Answer**: "Stack traces expose internal file paths, operating system details, third-party library versions, and database structure. Exposing this information in production creates security vulnerabilities that attackers can exploit (Information Disclosure). Users and clients should only receive friendly, actionable error messages."

### Q7: What is the difference between `PUT` and `PATCH`?
- **Answer**: "In strict REST semantics, `PUT` is used to replace an entire resource, while `PATCH` applies partial modifications. In many practical Node/Express apps, `PUT` is often implemented to accept partial updates (`findByIdAndUpdate(id, req.body)`). In this assignment, `PUT /tasks/:id` allows updating any field of the task cleanly with Mongoose validation."

---

## 3. Explaining the REST API Design
- **POST /tasks**: Creates a new task after validating that the title is provided. Returns `201 Created`.
- **GET /tasks**: Retrieves tasks from MongoDB with optional status filter and sorting. Returns `200 OK`.
- **GET /tasks/:id**: Retrieves single task by valid ObjectId. Returns `200 OK` or `404 Not Found`.
- **PUT /tasks/:id**: Updates any task field with validation. Returns `200 OK` or `404 Not Found`.
- **DELETE /tasks/:id**: Deletes the task by ID. Returns `200 OK` with confirmation.
