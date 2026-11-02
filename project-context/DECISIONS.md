# Architectural & Engineering Decisions - Personal Task Manager

This document records the architectural, design, and implementation decisions made throughout the project, detailing the context, options considered, decision taken, and the reasoning behind it.

---

## Decision 1: Monorepo-Style Folder Separation (`frontend/` + `backend/`)
- **Context**: The project requires both a client application and a server API.
- **Alternatives Considered**:
  - *Single combined package.json*: Mixing client and server dependencies.
  - *Separated top-level directories*: `frontend/` and `backend/` with independent `package.json` files.
- **Decision**: Separated `frontend/` and `backend/` directories.
- **Reasoning**:
  - Ensures clean separation of concerns.
  - Backend dependencies (e.g. Express, Mongoose) do not pollute frontend bundles.
  - Matches real-world enterprise architectures where frontend and backend can be deployed independently.
  - Simple for an interview reviewer to navigate.

---

## Decision 2: Build Tool - Vite instead of Create-React-App (CRA)
- **Context**: Setting up the React client application.
- **Alternatives Considered**: Create-React-App, Vite, Next.js.
- **Decision**: Vite with the `react` template.
- **Reasoning**:
  - CRA is deprecated and slow.
  - Next.js introduces server-side rendering and routing conventions that add unnecessary complexity for a beginner MERN task manager.
  - Vite is lightning-fast, lightweight, standard in modern React development, and easy to explain.

---

## Decision 3: HTTP Client - Browser Native `fetch` instead of Axios
- **Context**: Frontend needs to communicate with the Express backend REST API.
- **Alternatives Considered**: Axios, TanStack Query, Native `fetch`.
- **Decision**: Native `fetch` with simple helper functions.
- **Reasoning**:
  - Native `fetch` is built into modern browsers; no extra npm package is needed.
  - Demonstrates core JavaScript competency during interviews.
  - Keeps bundle size minimal and logic transparent.

---

## Decision 4: Styling Approach - Vanilla CSS
- **Context**: Styling the task manager interface.
- **Alternatives Considered**: Tailwind CSS, CSS Modules, Styled Components, Vanilla CSS.
- **Decision**: Vanilla CSS with organized layout classes and CSS variables.
- **Reasoning**:
  - Avoids setup overhead, config files, and compiler dependencies.
  - Every CSS property is visible and understandable without framework-specific utility knowledge.
  - Excellent for interviews because it tests fundamental CSS knowledge (Flexbox, Grid, transitions).

---

## Decision 5: Dev Server Reloading - `nodemon` for Backend
- **Context**: Developer experience when modifying Express routes or models.
- **Alternatives Considered**: Manual restart (`node server.js`), `nodemon`, `ts-node-dev`.
- **Decision**: `nodemon` as a development dependency.
- **Reasoning**:
  - Restarts the server automatically upon file save.
  - Zero config needed; just run `npm run dev`.

---

## Decision 6: Environment Isolation via `.env` and `.env.example`
- **Context**: Securing database connection strings and server configuration.
- **Alternatives Considered**: Hardcoded configuration values vs `.env` files with `dotenv`.
- **Decision**: Use `.env` with `dotenv`, providing `.env.example` as a template and adding `.env` to `.gitignore`.
- **Reasoning**:
  - Security best practice: secrets (like MongoDB credentials) must never be committed to source control.
  - Standard industry practice expected in technical interviews.

---

## Decision 7: Model-Controller-Route Layered Backend Pattern
- **Context**: Structuring the Express.js backend codebase.
- **Alternatives Considered**: All-in-one `server.js` file vs layered architecture (`config/`, `models/`, `controllers/`, `routes/`, `middleware/`).
- **Decision**: Layered architecture with explicit separation.
- **Reasoning**:
  - Avoids monolithic code files that are hard to read and test.
  - Each layer has a single responsibility:
    - `routes/`: Defines HTTP methods and endpoint paths.
    - `controllers/`: Handles request validation, calls models, returns JSON.
    - `models/`: Enforces data schema and data integrity via Mongoose.
    - `middleware/`: Intercepts errors and 404s globally.
  - Highly appreciated in fresh graduate / junior MERN interviews.

---

## Decision 8: Priority Sorting Ranking Implementation
- **Context**: Implementing priority sorting (`high`, `medium`, `low`).
- **Alternatives Considered**:
  - Pure string sorting in database (alphabetical: `high` -> `low` -> `medium`), which is logically incorrect.
  - In-memory logical rank sorting: `{ high: 1, medium: 2, low: 3 }`.
- **Decision**: Logical rank mapping in controller memory.
- **Reasoning**:
  - Guarantees `high` priority tasks appear first, followed by `medium`, then `low`.
  - Easy for a fresher to explain: "Since priority strings don't alphabetize logically, we map them to numbers 1, 2, and 3 so the sorting matches human expectations."

---

## Decision 9: Safe Centralized Error Handling Without Stack Trace Leakage
- **Context**: Handling unexpected errors and database rejections.
- **Alternatives Considered**: Returning raw `err.stack` or inline `try/catch` with ad-hoc response shapes.
- **Decision**: Centralized Express error-handling middleware (`errorMiddleware.js`) returning uniform `{ success: false, message: ... }` without stack traces.
- **Reasoning**:
  - Security best practice: exposing stack traces reveals internal paths, server libraries, and vulnerabilities to attackers.
  - Provides a predictable JSON interface for frontend clients.

---

## Decision 10: Modern Mongoose 8+ `returnDocument: 'after'`
- **Context**: Returning the modified document from `findByIdAndUpdate`.
- **Alternatives Considered**: `{ new: true }` vs `{ returnDocument: 'after' }`.
- **Decision**: Use `{ returnDocument: 'after', runValidators: true }`.
- **Reasoning**:
  - In Mongoose 8+, `{ new: true }` produces deprecation warnings.
  - Demonstrates up-to-date knowledge of the Mongoose ecosystem.
