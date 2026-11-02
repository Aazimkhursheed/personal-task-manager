# Interview Preparation Guide - Personal Task Manager

This guide covers essential technical concepts, common interview questions, and clear, practical answers you can reference when explaining this MERN application during an interview.

---

## 1. High-Level Architecture Explanation
**Question**: *"Can you walk me through the high-level architecture of your project?"*

**Answer**:
> "This is a full-stack MERN application split into two main parts:
> 1. **Client (Frontend)**: Built with React and Vite. It renders a 3-column task dashboard (Todo, In Progress, Done), manages client-side state using React hooks (`useState`, `useEffect`), and makes asynchronous HTTP requests using the native `fetch` API.
> 2. **Server (Backend)**: Built with Node.js and Express. It serves a RESTful API, handles request validation, and talks to MongoDB Atlas using Mongoose models.
> 
> The frontend and backend run as independent processes (Frontend on port `5173`, Backend on port `5000`). They communicate over HTTP with JSON payloads, and CORS is enabled on the backend so the browser allows the requests."

---

## 2. Frontend React Questions & Answers

### Q1: How is state managed in the frontend?
- **Answer**: "We manage all core task state inside the root `App.jsx` component using React's `useState` hook:
  - `tasks`: Holds the array of task objects returned from the backend.
  - `loading`: A boolean indicating whether data is currently being fetched (used to show a loading spinner).
  - `submitting`: A boolean indicating whether a task is currently being created (used to disable the submit button).
  - `errorMessage` / `successMessage`: Strings for displaying informative user feedback banners.
  Derived state like `todoTasks`, `inProgressTasks`, and `doneTasks` are computed using simple `.filter()` calls on the `tasks` array."

### Q2: How do you achieve immediate UI updates without refreshing the page?
- **Answer**: "Whenever a user performs a mutation (Create, Update Status, or Delete), we update the local React state immediately upon a successful API response:
  - **Create**: We prepend the newly created task to state: `setTasks(prev => [newTask, ...prev])`.
  - **Update Status**: We map over existing tasks and swap the updated task: `setTasks(prev => prev.map(t => t._id === id ? updated : t))`.
  - **Delete**: We filter out the deleted task ID: `setTasks(prev => prev.filter(t => t._id !== id))`.
  Because React state changes trigger a re-render, the UI updates instantaneously without any page reload."

### Q3: Why did you break down the frontend into separate components?
- **Answer**: "Decomposition follows the Single Responsibility Principle:
  - `Navbar.jsx`: Only responsible for rendering the branding and overall statistics.
  - `TaskForm.jsx`: Manages input form state, input validation, and task creation.
  - `TaskColumn.jsx`: Represents a column section (`Todo`, `In Progress`, `Done`) and renders its task list or empty state.
  - `TaskCard.jsx`: Encapsulates the visual presentation of a single task, its priority badge, status dropdown, and delete trigger.
  - `services/api.js`: Centralizes all network HTTP requests using native `fetch`.
  This makes each file small, focused, readable, and easy to maintain."

### Q4: What is a controlled component in React?
- **Answer**: "A controlled component is an input element whose value is controlled by React state rather than the DOM. For example, in `TaskForm.jsx`, the title input has `value={title}` and `onChange={(e) => setTitle(e.target.value)}`. This allows us to validate the input in real-time, clear it programmatically upon submission, and prevent empty submissions."

### Q5: Why use native `fetch` instead of Axios?
- **Answer**: "Native `fetch` is built into all modern browsers, requiring zero npm dependencies and keeping our bundle light. It also demonstrates strong fundamentals in core JavaScript (Promises, async/await, HTTP headers, checking `response.ok`, and parsing JSON). In interviews, writing clean native `fetch` code proves you understand how browsers communicate with APIs."

---

## 3. Backend Architecture & Design Questions

### Q6: Why did you separate routes and controllers into different folders?
- **Answer**: "Separating routes and controllers follows the Single Responsibility Principle:
  - The **route file** (`taskRoutes.js`) only defines HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and paths (`/tasks`, `/tasks/:id`).
  - The **controller file** (`taskController.js`) contains business logic, request validation, database interactions, and response formatting.
  This makes the code modular, readable, and testable."

### Q7: How does MongoDB connection work in this project?
- **Answer**: "We created a dedicated `connectDB()` function in `backend/config/db.js`. It uses `mongoose.connect(process.env.MONGO_URI)`. Because connecting to a database is an asynchronous network operation, we wrap it in an `async/await` block. If connection succeeds, we log the host. If it fails, we catch the error, log a descriptive message, and call `process.exit(1)` to terminate safely."

### Q8: How did you fix the MongoDB Atlas SRV DNS resolution issue?
- **Answer**: "On certain networks and Windows configurations, Node.js's internal c-ares DNS resolver fails with `querySrv ECONNREFUSED` when resolving MongoDB Atlas SRV records. We fixed this by importing Node's built-in `dns` module and calling `dns.setServers(['1.1.1.1'])` in `db.js` before calling `mongoose.connect()`. This cleanly resolved the SRV records using Cloudflare's public DNS without requiring external packages."

### Q9: How does status filtering and sorting work in `GET /tasks`?
- **Answer**: "Clients pass query parameters in the URL: `GET /tasks?status=todo&sortBy=dueDate&order=asc`.
  - **Filtering**: We read `req.query.status`, validate it against allowed enums, and pass it to Mongoose: `Task.find({ status })`.
  - **Due Date Sorting**: If `req.query.sortBy === 'dueDate'`, we use Mongoose `.sort({ dueDate: order === 'desc' ? -1 : 1 })`.
  - **Priority Sorting**: Alphabetical sorting fails for priorities because `'low'` comes before `'medium'`. So we map priorities to numerical ranks (`{ high: 1, medium: 2, low: 3 }`) and sort the tasks logically so high-priority tasks always appear first."

### Q10: How does Express centralized error handling work?
- **Answer**: "Express recognizes error-handling middleware by its 4 arguments: `(err, req, res, next)`. Whenever a controller encounters an unexpected exception inside a `catch` block, it calls `next(error)`. Express skips all remaining routes and invokes our `errorHandler` in `errorMiddleware.js`. The middleware formats a clean JSON response `{ success: false, message }` and avoids returning raw stack traces for security."

---

## 4. Key Talking Points for Code Quality
- Clean functional components and custom CSS.
- Responsive design adapting gracefully from desktop to mobile screens.
- Robust error handling both on client (loading spinners, error alerts) and server (HTTP status codes `200`, `201`, `400`, `404`, `500`).
- No external fluff or bloat — purely beginner-friendly, idiomatic MERN code.
