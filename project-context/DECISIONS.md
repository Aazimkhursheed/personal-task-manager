# Architectural & Engineering Decisions - Personal Task Manager

This document records the architectural, design, and implementation decisions made throughout the project, detailing the context, options considered, decision taken, and the reasoning behind it.

---

## Decision 1: Monorepo-Style Folder Separation (`frontend/` + `backend/`)
- **Context**: The project requires both a client application and a server API.
- **Alternatives Considered**: Single combined package.json vs separated top-level directories (`frontend/` and `backend/`).
- **Decision**: Separated `frontend/` and `backend/` directories.
- **Reasoning**: Ensures clean separation of concerns, avoids polluting client bundles, and matches industry production structures.

---

## Decision 2: Build Tool - Vite instead of Create-React-App (CRA)
- **Context**: Setting up the React client application.
- **Alternatives Considered**: Create-React-App, Vite, Next.js.
- **Decision**: Vite with the `react` template.
- **Reasoning**: CRA is deprecated and slow. Vite is modern, lightning-fast with native ESM, and lightweight.

---

## Decision 3: HTTP Client - Browser Native `fetch` instead of Axios
- **Context**: Frontend needs to communicate with the Express backend REST API.
- **Alternatives Considered**: Axios, TanStack Query, Native `fetch`.
- **Decision**: Native `fetch` organized in `services/api.js`.
- **Reasoning**: Native `fetch` requires zero external packages, keeps client bundle size minimal, and demonstrates fundamental JavaScript promise/async knowledge.

---

## Decision 4: Styling Approach - Vanilla CSS
- **Context**: Styling the task manager interface.
- **Alternatives Considered**: Tailwind CSS, CSS Modules, Styled Components, Vanilla CSS.
- **Decision**: Vanilla CSS (`App.css` and `index.css`) with CSS Grid and Flexbox.
- **Reasoning**: Avoids framework overhead, allows clean inspection of CSS properties, and demonstrates core CSS competency.

---

## Decision 5: Dev Server Reloading - `nodemon` for Backend
- **Context**: Developer experience when modifying Express routes or models.
- **Alternatives Considered**: Manual restart (`node server.js`), `nodemon`, `ts-node-dev`.
- **Decision**: `nodemon` as a development dependency.
- **Reasoning**: Restarts the server automatically upon file save with zero config needed (`npm run dev`).

---

## Decision 6: Environment Isolation via `.env` and `.env.example`
- **Context**: Securing database connection strings and server configuration.
- **Alternatives Considered**: Hardcoded configuration values vs `.env` files with `dotenv`.
- **Decision**: Use `.env` with `dotenv`, providing `.env.example` as a template and adding `.env` to `.gitignore`.
- **Reasoning**: Security best practice: secrets must never be committed to Git.

---

## Decision 7: Model-Controller-Route Layered Backend Pattern
- **Context**: Structuring the Express.js backend codebase.
- **Alternatives Considered**: All-in-one `server.js` file vs layered architecture (`config/`, `models/`, `controllers/`, `routes/`, `middleware/`).
- **Decision**: Layered architecture with explicit separation.
- **Reasoning**: Separates routing from business logic and database interactions, making code modular and readable.

---

## Decision 8: Priority Sorting Ranking Implementation
- **Context**: Implementing priority sorting (`high`, `medium`, `low`).
- **Alternatives Considered**: Alphabetical string sort (`high` -> `low` -> `medium`) vs in-memory logical ranking.
- **Decision**: Logical rank mapping in controller: `{ high: 1, medium: 2, low: 3 }`.
- **Reasoning**: Alphabetical sorting does not match human intuition. Numeric ranking ensures high priority tasks appear first.

---

## Decision 9: Safe Centralized Error Handling Without Stack Trace Leakage
- **Context**: Handling unexpected errors and database rejections.
- **Alternatives Considered**: Exposing `err.stack` vs centralized error handler returning clean JSON.
- **Decision**: Centralized error middleware returning `{ success: false, message: ... }`.
- **Reasoning**: Security best practice to prevent information disclosure while giving clients friendly error messages.

---

## Decision 10: Modern Mongoose 8+ `returnDocument: 'after'`
- **Context**: Returning the modified document from `findByIdAndUpdate`.
- **Alternatives Considered**: `{ new: true }` vs `{ returnDocument: 'after' }`.
- **Decision**: Use `{ returnDocument: 'after', runValidators: true }`.
- **Reasoning**: In Mongoose 8+, `{ new: true }` produces deprecation warnings.

---

## Decision 11: Custom DNS Server Configuration (`dns.setServers(['1.1.1.1'])`)
- **Context**: Resolving MongoDB Atlas SRV records (`mongodb+srv://`) when local or ISP DNS servers fail with `querySrv ECONNREFUSED`.
- **Alternatives Considered**: Modifying system-wide network adapter DNS settings vs calling Node.js native `dns.setServers(['1.1.1.1'])`.
- **Decision**: Configure `dns.setServers(['1.1.1.1'])` in `backend/config/db.js`.
- **Reasoning**: Zero system configuration changes required; works across all networks and machines natively.

---

## Decision 12: Three-Column Kanban-Style Status Workflow
- **Context**: Organizing task cards visually by their lifecycle stage.
- **Alternatives Considered**: Single long list with status filters vs 3 visual columns (`Todo`, `In Progress`, `Done`).
- **Decision**: 3 dedicated columns with status counters and empty state notifications.
- **Reasoning**: Allows users to instantly view workload distribution at a glance, matching modern productivity dashboards.

---

## Decision 13: Dedicated Native Fetch API Service Layer (`services/api.js`)
- **Context**: Making HTTP requests from React components to the Express backend.
- **Alternatives Considered**: Inlining `fetch()` inside each component vs centralized `services/api.js` helper functions.
- **Decision**: Centralized `api.js` exporting `getTasks`, `createTask`, `updateTaskStatus`, and `deleteTask`.
- **Reasoning**: Keeps UI components clean and focused on rendering. Any changes to API endpoints or headers only require editing one file.

---

## Decision 14: Immediate UI State Synchronization (No Manual Refresh)
- **Context**: Synchronizing client-side React state after API mutations (create, update status, delete).
- **Alternatives Considered**: Forcing `window.location.reload()` vs updating React `tasks` state immediately upon API response.
- **Decision**: Update `tasks` state immediately using functional state setters (`setTasks(prev => ...)`).
- **Reasoning**: Provides a smooth, seamless Single Page Application (SPA) experience without jarring page reloads.

---

## Decision 15: Safe Date Parsing & Client-Side Validation in `TaskForm`
- **Context**: Handling user input in the task creation form.
- **Alternatives Considered**: Sending raw form values directly to backend vs client-side validation and date parsing.
- **Decision**: Validate that `title.trim()` is not empty before sending, and safely parse dates with `isNaN(new Date(...).getTime())`.
- **Reasoning**: Gives instantaneous user feedback on missing fields and avoids sending malformed payloads to the API.
