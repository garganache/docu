---
sidebar_position: 3
---

# API Reference

Complete REST API documentation for **App A v1.0**.

## Base URL

```
https://api.app-a.example.com/v1
```

## Authentication

All API requests require authentication using Bearer tokens.

### Get Access Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 86400
}
```

### Use Token

Include the token in the `Authorization` header:

```http
GET /projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Projects

### List Projects

```http
GET /projects
```

**Query Parameters:**

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| page      | int    | Page number (default: 1) |
| limit     | int    | Items per page (max: 100)|
| status    | string | Filter by status         |

**Response:**

```json
{
  "data": [
    {
      "id": "proj_1234",
      "name": "My Project",
      "status": "active",
      "created_at": "2026-01-15T10:00:00Z",
      "updated_at": "2026-02-13T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}
```

### Get Project

```http
GET /projects/{id}
```

**Response:**

```json
{
  "id": "proj_1234",
  "name": "My Project",
  "description": "Project description",
  "status": "active",
  "owner": {
    "id": "user_5678",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "members": [
    {
      "id": "user_9012",
      "name": "Jane Smith",
      "role": "editor"
    }
  ],
  "created_at": "2026-01-15T10:00:00Z",
  "updated_at": "2026-02-13T14:00:00Z"
}
```

### Create Project

```http
POST /projects
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "template": "default"
}
```

**Response:**

```json
{
  "id": "proj_5678",
  "name": "New Project",
  "status": "active",
  "created_at": "2026-02-13T14:00:00Z"
}
```

### Update Project

```http
PATCH /projects/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

### Delete Project

```http
DELETE /projects/{id}
```

**Response:**

```json
{
  "success": true,
  "message": "Project deleted"
}
```

## Tasks

### List Tasks

```http
GET /projects/{project_id}/tasks
```

**Query Parameters:**

| Parameter  | Type   | Description              |
|------------|--------|--------------------------|
| status     | string | todo, in_progress, done  |
| assignee   | string | User ID                  |
| priority   | string | low, medium, high        |

### Create Task

```http
POST /projects/{project_id}/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "assignee_id": "user_1234",
  "priority": "high",
  "due_date": "2026-02-20"
}
```

### Update Task

```http
PATCH /tasks/{id}
Content-Type: application/json

{
  "status": "in_progress",
  "priority": "medium"
}
```

## Users

### Get Current User

```http
GET /users/me
```

**Response:**

```json
{
  "id": "user_1234",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "created_at": "2026-01-01T00:00:00Z"
}
```

### Update User Profile

```http
PATCH /users/me
Content-Type: application/json

{
  "name": "John Updated",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

## Webhooks

### Create Webhook

```http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["project.created", "task.updated"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload

When an event occurs, we'll send a POST request:

```json
{
  "event": "task.updated",
  "timestamp": "2026-02-13T14:00:00Z",
  "data": {
    "id": "task_1234",
    "status": "done",
    "project_id": "proj_5678"
  }
}
```

## Rate Limiting

- **100 requests per minute** per IP
- **10,000 requests per day** per API key

Rate limit headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1613221200
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "not_found",
    "message": "Project not found",
    "details": {}
  }
}
```

**Common Error Codes:**

| Code               | HTTP Status | Description            |
|--------------------|-------------|------------------------|
| unauthorized       | 401         | Invalid/missing token  |
| forbidden          | 403         | Insufficient permissions|
| not_found          | 404         | Resource not found     |
| validation_error   | 422         | Invalid request data   |
| rate_limit_exceeded| 429         | Too many requests      |
| server_error       | 500         | Internal server error  |

---

**Need more details?** Contact [api-support@example.com](mailto:api-support@example.com)
