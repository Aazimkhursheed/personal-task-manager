# Personal Task Manager (MERN Stack)

A clean, beginner-friendly full-stack Personal Task Manager built with the MERN stack for a company interview assignment.

---

## Folder Structure

```
task-manager/
├── backend/                  # Node.js + Express.js API server
│   ├── node_modules/
│   ├── .env.example          # Environment variables template
│   ├── .gitignore            # Backend-specific ignore rules
│   ├── package.json          # Express, Mongoose, dotenv, cors, nodemon
│   └── server.js             # Express entry point with health check
├── frontend/                 # React + Vite client application
│   ├── node_modules/
│   ├── public/
│   ├── src/                  # React components and styling
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── project-context/          # Complete architectural & interview docs
│   ├── PROJECT_OVERVIEW.md   # Goals, architecture, planned features
│   ├── REQUIREMENTS.md       # Functional & non-functional requirements
│   ├── TECH_STACK.md         # Detailed tech choices & justifications
│   ├── IMPLEMENTATION_LOG.md # Commands executed, files created, issues
│   ├── DECISIONS.md          # Architectural decisions & reasoning
│   ├── API_DOCUMENTATION.md  # REST API specification & schemas
│   └── INTERVIEW_PREPARATION.md # Interview questions & talking points
├── .gitignore                # Root gitignore (node_modules, .env files)
└── README.md                 # Project setup and running instructions
```

---

## Prerequisites
- **Node.js**: v18 or higher recommended
- **npm**: v9 or higher
- **MongoDB Atlas Account** (or local MongoDB instance)

---

## Quick Start Guide

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your `.env` configuration file from the template:
   ```bash
   copy .env.example .env
   ```
   *(On macOS/Linux: `cp .env.example .env`)*
3. Open `.env` and fill in your MongoDB Atlas connection string:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend in development mode:
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:5000` (Health check at `http://localhost:5000/api/health`).

---

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## Documentation Links
All planning, architecture, and interview materials are maintained in the [`project-context/`](./project-context/) directory:
- [Project Overview](./project-context/PROJECT_OVERVIEW.md)
- [Requirements](./project-context/REQUIREMENTS.md)
- [Technology Stack](./project-context/TECH_STACK.md)
- [Implementation Log](./project-context/IMPLEMENTATION_LOG.md)
- [Architectural Decisions](./project-context/DECISIONS.md)
- [API Documentation](./project-context/API_DOCUMENTATION.md)
- [Interview Preparation Guide](./project-context/INTERVIEW_PREPARATION.md)
