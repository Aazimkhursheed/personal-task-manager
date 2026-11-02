# API Documentation - Personal Task Manager

This document defines the RESTful API endpoints implemented for the Personal Task Manager backend.

---

## 1. Base URL
```
http://localhost:5000/tasks
# Also accessible at http://localhost:5000/api/tasks
```

---

## 2. Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```
*(When returning lists, a `"count"` property is also included: `{ "success": true, "count": 3, "data": [...] }`)*

### Error Response
```json
{
  "success": false,
  "message": "Human-readable error description"
}
```
*Note: Raw stack traces are never exposed to clients.*

---

## 3. Endpoints Summary

| Method | Endpoint | Query Parameters | Description | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | — | Server health & readiness check | `200 OK` |
| `POST` | `/tasks` | — | Create a new task | `201 Created` / `400 Bad Request` |
| `GET` | `/tasks` | `status`, `sortBy`, `order` | Get all tasks (with filtering & sorting) | `200 OK` / `400 Bad Request` |
| `GET` | `/tasks/:id` | — | Get a single task by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `PUT` | `/tasks/:id` | — | Update any task field | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | — | Delete a task by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |

---

## 4. Endpoint Specifications

### 4.1 Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Task Manager API is running smoothly"
  }
  ```

---

### 4.2 Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Validation Rules**:
  - `title`: String, required. Cannot be empty or whitespace only.
  - `description`: String, optional.
  - `priority`: Optional. If provided, must be `'low'`, `'medium'`, or `'high'` (default: `'medium'`).
  - `status`: Optional. If provided, must be `'todo'`, `'in_progress'`, or `'done'` (default: `'todo'`).
  - `dueDate`: ISO Date string, optional.
- **Request Body Example**:
  ```json
  {
    "title": "Complete System Design",
    "description": "Study distributed caches",
    "priority": "high",
    "status": "todo",
    "dueDate": "2026-11-10T10:00:00Z"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "_id": "672616f734567890abcdef12",
      "title": "Complete System Design",
      "description": "Study distributed caches",
      "priority": "high",
      "status": "todo",
      "dueDate": "2026-11-10T10:00:00.000Z",
      "createdAt": "2026-11-02T06:55:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "success": false, "message": "Title is required" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid priority. Allowed values: low, medium, high" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid status. Allowed values: todo, in_progress, done" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid due date format" }`

---

### 4.3 Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `status` *(optional)*: Filter by task status (`todo`, `in_progress`, or `done`).
  - `sortBy` *(optional)*:
    - `priority`: Sorts logically by priority hierarchy (`high` > `medium` > `low`).
    - `dueDate`: Sorts chronologically by due date.
    - Default (if omitted): Sorts by `createdAt` descending (newest first).
  - `order` *(optional)*: `'asc'` (default) or `'desc'` to reverse sort order.
- **Example Requests**:
  - `GET /tasks?status=todo`
  - `GET /tasks?sortBy=priority`
  - `GET /tasks?sortBy=dueDate&order=desc`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "672616f734567890abcdef12",
        "title": "Complete System Design",
        "description": "Study distributed caches",
        "priority": "high",
        "status": "todo",
        "dueDate": "2026-11-10T10:00:00.000Z",
        "createdAt": "2026-11-02T06:55:00.000Z"
      }
    ]
  }
  ```

---

### 4.4 Get Single Task
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "_id": "672616f734567890abcdef12",
      "title": "Complete System Design",
      "description": "Study distributed caches",
      "priority": "high",
      "status": "todo",
      "dueDate": "2026-11-10T10:00:00.000Z",
      "createdAt": "2026-11-02T06:55:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "success": false, "message": "Invalid task ID format" }`
  - `404 Not Found`: `{ "success": false, "message": "Task not found" }`

---

### 4.5 Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Request Body Example**:
  ```json
  {
    "status": "in_progress",
    "priority": "medium"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "_id": "672616f734567890abcdef12",
      "title": "Complete System Design",
      "description": "Study distributed caches",
      "priority": "medium",
      "status": "in_progress",
      "dueDate": "2026-11-10T10:00:00.000Z",
      "createdAt": "2026-11-02T06:55:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "success": false, "message": "Title cannot be empty" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid task ID format" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid priority. Allowed values: low, medium, high" }`
  - `400 Bad Request`: `{ "success": false, "message": "Invalid status. Allowed values: todo, in_progress, done" }`
  - `404 Not Found`: `{ "success": false, "message": "Task not found" }`

---

### 4.6 Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "success": false, "message": "Invalid task ID format" }`
  - `404 Not Found`: `{ "success": false, "message": "Task not found" }`
