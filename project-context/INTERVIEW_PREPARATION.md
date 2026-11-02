# Interview Preparation Guide - Personal Task Manager

This guide covers essential technical concepts, common questions, and practical explanations you can reference when explaining this MERN application during an interview.

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

## 2. Key MERN Concepts & Questions

### Q1: Why did you separate frontend and backend into two folders?
- **Answer**: "Separating them ensures a clean separation of concerns. The frontend only contains UI presentation logic and browser-specific code, while the backend contains data models, business logic, and database connections. It also allows them to have their own separate `package.json` dependencies and makes them ready for independent deployment (e.g., frontend on Vercel/Netlify, backend on Render/AWS)."

### Q2: Why use Vite instead of Create React App?
- **Answer**: "Create React App is now officially deprecated and uses Webpack, which does full bundle recompilation and can be slow. Vite uses native ES Modules (ESM) in the browser during development, which gives near-instant server start and lightning-fast Hot Module Replacement (HMR)."

### Q3: What is the purpose of `dotenv` and `.env.example`?
- **Answer**: "Sensitive information like database connection strings (which contain credentials) and server ports should never be hardcoded or checked into public source control (Git). We keep them in a `.env` file and add `.env` to `.gitignore`. We provide `.env.example` as a template containing placeholder values so other developers know what environment variables are needed."

### Q4: What is CORS and why do we need the `cors` package in Express?
- **Answer**: "CORS stands for Cross-Origin Resource Sharing. By default, web browsers block web pages from making HTTP requests to a different domain, port, or protocol for security (Same-Origin Policy). Because our React app runs on `http://localhost:5173` and Express runs on `http://localhost:5000`, they are different origins. The `cors` package in Express sets the necessary HTTP headers (like `Access-Control-Allow-Origin`) so our frontend can communicate with the backend."

### Q5: How does Mongoose help us with MongoDB?
- **Answer**: "MongoDB is a NoSQL, schema-less database. While this gives flexibility, in real-world applications we need structure and validation. Mongoose is an ODM (Object Data Modeling) library that allows us to define schemas with types, required fields, and default values. It also provides clean async helper methods like `Task.find()`, `Task.create()`, and `Task.findByIdAndDelete()`."

### Q6: Why prefer `async/await` over raw Promises or Callbacks?
- **Answer**: "`async/await` is syntactic sugar over Promises. It makes asynchronous code look and read like synchronous code, avoiding 'callback hell' or long `.then()` chains. It also allows us to handle errors cleanly using standard `try/catch` blocks."

---

## 3. Explaining the REST API Design
- **GET /api/tasks**: Retrieves all tasks from MongoDB.
- **POST /api/tasks**: Creates a new task after validating that the title is provided. Returns `201 Created`.
- **PUT /api/tasks/:id**: Updates a specific task's title, description, or completion status.
- **DELETE /api/tasks/:id**: Deletes the specified task by ID and returns a confirmation.

---

## 4. Key Talking Points for Code Cleanliness
- Keep components focused on a single responsibility.
- Use meaningful variable and function names (e.g., `fetchTasks`, `handleToggleStatus`, `handleDeleteTask`).
- Return standard HTTP status codes (`200`, `201`, `400`, `404`, `500`) with consistent JSON format (`{ success, data }` or `{ success, message }`).
