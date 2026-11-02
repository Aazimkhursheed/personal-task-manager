# Technology Stack - Personal Task Manager

This document details the selected technologies, libraries, tools, and the rationale behind choosing them for the Personal Task Manager.

---

## 1. Frontend Technologies (Part 2 - Implemented)

| Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **React** | `^19.0.0` | UI Library | Functional components with hooks (`useState`, `useEffect`). Declarative, component-based, industry standard. |
| **Vite** | `^6.2.0` | Build Tool & Dev Server | Fast ESM-based dev server, near-instant HMR, lightweight configuration. |
| **JavaScript (ES6+)** | ES2022+ | Language | Plain JavaScript without unnecessary transpilers or TypeScript overhead; clean and beginner-friendly. |
| **Vanilla CSS** | CSS3 | Styling | CSS Flexbox and Grid layouts; clear separation of presentation and logic without utility framework overhead. |
| **Native Fetch API** | Browser Native | HTTP Client | Built into modern web browsers; zero third-party dependency footprint; ideal for explaining REST calls in interviews. |

---

## 2. Backend Technologies (Part 1 - Implemented)

| Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **Node.js** | v18+ | Runtime Environment | High-performance asynchronous event-driven JavaScript runtime on the server. |
| **Express.js** | `^4.21.2` | Web Framework | Lightweight, unopinionated framework with straightforward routing, middleware support, and JSON parsing. |
| **Mongoose** | `^8.10.0` | MongoDB ODM | Provides schema definition, model validation (enums, required flags), and simple query helpers (`find`, `findByIdAndUpdate`, `findByIdAndDelete`). |
| **dotenv** | `^16.4.7` | Environment Configuration | Loads environment variables from a `.env` file into `process.env` securely. |
| **cors** | `^2.8.5` | Cross-Origin Middleware | Enables secure cross-origin requests from the React frontend running on port 5173. |
| **nodemon** | `^3.1.9` *(dev)* | Live Reloading | Automatically restarts the Node.js server whenever code changes are saved during development. |

---

## 3. Database

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **MongoDB Atlas / Local MongoDB** | NoSQL Database | Flexible document model, JSON-like BSON structure, easy integration with Mongoose ODM via connection string. |

---

## 4. Frontend Component Hierarchy

```
[App.jsx]
   │
   ├── [Navbar.jsx]           (Displays app title, total and completed counters)
   │
   ├── [TaskForm.jsx]         (Inputs: Title, Priority, Due Date, Description + Submit validation)
   │
   └── [TaskColumn.jsx] x 3   (Todo, In Progress, Done columns with item counts)
          │
          └── [TaskCard.jsx]  (Title, Priority Badge, Description, Due Date, Status Select, Delete Button)
                 │
                 └── [services/api.js] (Native fetch REST bridge to http://localhost:5000/tasks)
```
