# TaskFlow

TaskFlow is a full-stack task management application that I'm building while learning and improving my backend and full-stack development skills.

The project is being developed feature by feature, with the backend being the main focus of my current learning.

## Project Status

**Currently in development.**

The backend currently has authentication, task CRUD operations, filtering, sorting, pagination, and request validation.

The React frontend is also being developed alongside the backend, but my current focus is understanding and building the backend myself rather than relying on tutorials or copying implementations.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

---

## Current Features

### Authentication

- User registration
- Password hashing with bcrypt
- User login
- JWT-based authentication
- Protected routes
- Authentication middleware

### Tasks

- Create tasks
- Get all tasks belonging to the logged-in user
- Get a task by ID
- Update tasks
- Delete tasks
- Task ownership authorization

### Task Querying

Tasks can currently be:

- Filtered by status
- Filtered by priority
- Sorted by due date
- Paginated
- Validated using Zod query schemas

Example:

```http
GET /api/v1/tasks?status=todo&priority=high&sort=-dueDate&page=1&limit=10
