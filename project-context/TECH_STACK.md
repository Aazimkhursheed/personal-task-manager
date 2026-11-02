# Technology Stack - Personal Task Manager

This document details the selected technologies, libraries, tools, and the rationale behind choosing them for the Personal Task Manager.

---

## 1. Frontend Technologies

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **React (v18+)** | UI Library | Component-based architecture, declarative rendering, and widespread industry standard. |
| **Vite** | Build Tool & Dev Server | Extremely fast cold start, instant Hot Module Replacement (HMR), minimal configuration. |
| **JavaScript (ES6+)** | Programming Language | Plain, standard JavaScript; highly readable, beginner-friendly, and universally understood. |
| **Vanilla CSS** | Styling | Simple, standard CSS without build-step overhead, providing full styling control and clean separation of concerns. |
| **Fetch API** | HTTP Client | Browser-native API for executing REST requests; avoids unnecessary external dependencies like Axios. |

---

## 2. Backend Technologies

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **Node.js** | Runtime Environment | High-performance asynchronous event-driven JavaScript runtime on the server. |
| **Express.js** | Web Framework | Lightweight, unopinionated framework with straightforward routing and middleware support. |
| **Mongoose** | MongoDB ODM | Provides schema definition, model validation, and simple query helpers (`find`, `findByIdAndUpdate`, etc.). |
| **dotenv** | Environment Configuration | Loads environment variables from a `.env` file into `process.env` securely. |
| **cors** | Cross-Origin Middleware | Enables secure cross-origin requests from the React frontend running on a different port. |
| **nodemon** *(dev dependency)* | Live Reloading | Automatically restarts the Node.js server whenever code changes are saved during development. |

---

## 3. Database

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **MongoDB Atlas** | Cloud NoSQL Database | Flexible document model, fully managed cloud database, easy to connect via URI string. |

---

## 4. Version Control & Tools

| Tool | Purpose |
| :--- | :--- |
| **Git** | Distributed version control tracking changes across frontend, backend, and documentation. |
| **npm** | Package manager for managing Node.js and React dependencies. |
| **VS Code / Antigravity IDE** | Development environment for writing, running, and debugging code. |
