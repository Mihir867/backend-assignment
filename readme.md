# Task Management API

A RESTful API for a task management system built with TypeScript, Express, PostgreSQL, and Prisma. This API supports user registration, authentication, and CRUD operations for tasks, including filtering and searching capabilities.

## Features

- **User Registration and Authentication**
  - Users can register with a username and password.
  - Passwords are securely hashed.
  - Users can log in and receive a JWT token for authenticated requests.

- **Task Management**
  - Create, read, update, and delete tasks.
  - Tasks can be assigned to users.
  - Tasks include fields such as title, description, status, priority, due date, and timestamps.

- **Filtering and Searching**
  - Filter tasks based on status, priority, and due date.
  - Search tasks by title or description.

- **Dockerization**
  - The application is containerized using Docker.
  - A Docker Compose file is provided for easy setup.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Docker](https://www.docker.com/) (for containerization)
- [PostgreSQL](https://www.postgresql.org/) (for the database)

### Installation

Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api

```
Install dependencies:
```
npm install
```
Create a `.env` file with your database credentials and JWT secret key:
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
```

Run Databse Migrations
```
npx prisma migrate dev --name init
npx prisma generate
```

Start the application in development mode:
```
npm run dev
```
Start the application in production mode:
```
docker-compose up --build
```
### API Documentation
API documentation is available at [http://localhost:3000/api/docs](http://localhost:300
0/api/docs)
### API Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /tasks | Get all tasks |
| POST | /tasks | Create a new task |
| GET | /tasks/:id | Get a task by ID |
| PUT | /tasks/:id | Update a task by ID |
| DELETE | /tasks/:id | Delete a task by ID |

### API Request Body
| Field | Type | Description |
| --- | --- | --- |
| title | string | Task title |
| description | string | Task description |
| dueDate | date | Task due date |
| status | string | Task status (e.g. "in progress", "done") |
### API Response
| Field | Type | Description |
| --- | --- | --- |
| id | integer | Task ID |
| title | string | Task title |
| description | string | Task description |
| dueDate | date | Task due date |
| status | string | Task status (e.g. "in progress", "done") |
