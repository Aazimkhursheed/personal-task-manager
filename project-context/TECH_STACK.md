# Technology Stack - Personal Task Manager

This document details the selected technologies, libraries, tools, and the rationale behind choosing them for the Personal Task Manager.

---

## 1. Backend Technologies (Part 1 - Implemented)

| Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **Node.js** | v18+ | Runtime Environment | High-performance asynchronous event-driven JavaScript runtime on the server. |
| **Express.js** | `^4.21.2` | Web Framework | Lightweight, unopinionated framework with straightforward routing, middleware support, and JSON parsing. |
| **Mongoose** | `^8.10.0` | MongoDB ODM | Provides schema definition, model validation (enums, required flags), and simple query helpers (`find`, `findByIdAndUpdate`, `findByIdAndDelete`). |
| **dotenv** | `^16.4.7` | Environment Configuration | Loads environment variables from a `.env` file into `process.env` securely. |
| **cors** | `^2.8.5` | Cross-Origin Middleware | Enables secure cross-origin requests from the React frontend running on a different port. |
| **nodemon** | `^3.1.9` *(dev)* | Live Reloading | Automatically restarts the Node.js server whenever code changes are saved during development. |

---

## 2. Frontend Technologies (Part 2 - Planned)

| Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **React** | `^19.0.0` | UI Library | Component-based architecture, declarative rendering, and widespread industry standard. |
| **Vite** | `^6.2.0` | Build Tool & Dev Server | Extremely fast cold start, instant Hot Module Replacement (HMR), minimal configuration. |
| **JavaScript (ES6+)** | ES2022+ | Programming Language | Plain, standard JavaScript; highly readable, beginner-friendly, and universally understood. |
| **Vanilla CSS** | CSS3 | Styling | Simple, standard CSS without build-step overhead, providing full styling control and clean separation of concerns. |
| **Fetch API** | Browser Native | HTTP Client | Browser-native API for executing REST requests; avoids unnecessary external dependencies like Axios. |

---

## 3. Database

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **MongoDB Atlas / Local MongoDB** | NoSQL Database | Flexible document model, JSON-like BSON structure, easy integration with Mongoose ODM via connection string. |

---

## 4. Architectural Layers (Backend)

```
[HTTP Request]
       │
       ▼
[server.js] ──> (CORS, express.json)
       │
       ▼
[routes/taskRoutes.js]
       │
       ▼
[controllers/taskController.js] ──> Input Validation (title, priority, status, ObjectId)
       │
       ▼
[models/Task.js] ──> Mongoose Schema (Schema-level enums & types)
       │
       ▼
[config/db.js] ──> MongoDB Database Connection
       │
       ▼
[middleware/errorMiddleware.js] ──> 404 & Centralized Error Handler (No stack traces)
```
