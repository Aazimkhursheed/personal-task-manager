# Project Requirements - Personal Task Manager

## 1. Functional Requirements

### 1.1 Task Management (CRUD)
- **Create**:
  - The user can add a new task with a `title` (required) and an optional `description`.
  - New tasks default to `status: "pending"`.
- **Read**:
  - The user can view a list of all existing tasks fetched from the database.
  - The list displays task title, description, creation timestamp, and completion status.
- **Update**:
  - The user can toggle a task's status between `"pending"` and `"completed"`.
  - The user can edit the title and description of an existing task.
- **Delete**:
  - The user can delete an existing task by clicking a delete button.
  - The task is permanently removed from the MongoDB database.

### 1.2 User Interface & Interaction
- Simple, clear, and responsive interface.
- Intuitive feedback when loading data or submitting forms.
- Error alerts or notices when a network or validation error occurs.
- Filter buttons to easily view "All", "Pending", or "Completed" tasks.

---

## 2. Non-Functional Requirements

### 2.1 Code Quality & Style
- **Beginner-Friendly Code**: Written in clear, readable JavaScript. No complex abstractions, meta-programming, or unnecessary design patterns.
- **Async / Await**: Standard asynchronous syntax for handling promises and database/network calls.
- **Separation of Concerns**:
  - Backend handles data persistence, business logic, and API endpoints.
  - Frontend handles presentation, user interaction, and client-side state.
- **Easy to Debug & Explain**: Every function should do one clear thing with readable naming and basic error handling.

### 2.2 Security & Configuration
- Sensitive credentials (such as the MongoDB connection URI and server port) must be kept in `.env` files.
- `.env` files must NEVER be committed to Git.
- A template `.env.example` file must be provided so anyone cloning the repository knows which environment variables are required.

### 2.3 Performance & Reliability
- Fast build and reload times via Vite.
- Proper HTTP status codes returned by the Express API (`200`, `201`, `400`, `404`, `500`).
- Graceful error handling in both Express routes and React fetch requests.

---

## 3. Scope Boundaries (Out of Scope for this Stage)
- No user authentication / multi-tenancy (unless specifically requested in a future phase).
- No complex third-party state management libraries (e.g., Redux, Zustand) — standard React `useState` and `useEffect` are sufficient.
- No heavy styling frameworks like TailwindCSS or Material UI unless explicitly required — clean Vanilla CSS will be used.
