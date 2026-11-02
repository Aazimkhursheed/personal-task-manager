# API Documentation - Personal Task Manager

This document defines the planned RESTful API design for the Personal Task Manager backend.

---

## 1. Base URL
```
http://localhost:5000/api
```

---

## 2. Standard Response Format

All responses follow a predictable JSON format for consistency:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Human-readable error description"
}
```

---

## 3. Endpoints Overview

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check | `200 OK` |
| `GET` | `/tasks` | Fetch all tasks | `200 OK` |
| `GET` | `/tasks/:id` | Fetch single task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update an existing task | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Delete a task | `200 OK` / `404 Not Found` |

---

## 4. Endpoint Specifications

### 4.1 Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Server is up and running"
  }
  ```

---

### 4.2 Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "title": "Complete coding assignment",
        "description": "Build the MERN personal task manager",
        "status": "pending",
        "createdAt": "2026-11-02T10:00:00.000Z",
        "updatedAt": "2026-11-02T10:00:00.000Z"
      }
    ]
  }
  ```

---

### 4.3 Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Prepare for technical interview",
    "description": "Review MERN concepts and REST standards"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "title": "Prepare for technical interview",
      "description": "Review MERN concepts and REST standards",
      "status": "pending",
      "createdAt": "2026-11-02T12:00:00.000Z",
      "updatedAt": "2026-11-02T12:00:00.000Z"
    }
  }
  ```
- **Error Response** (`400 Bad Request`):
  ```json
  {
    "success": false,
    "message": "Task title is required"
  }
  ```

---

### 4.4 Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Request Body** (one or more fields):
  ```json
  {
    "status": "completed"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "title": "Prepare for technical interview",
      "description": "Review MERN concepts and REST standards",
      "status": "completed",
      "updatedAt": "2026-11-02T12:30:00.000Z"
    }
  }
  ```

---

### 4.5 Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Task successfully deleted"
  }
  ```
