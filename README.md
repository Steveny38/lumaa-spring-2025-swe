
# Full-Stack Task Management Application

This project is my submission for the Full-Stack Coding Challenge. It implements a task management application using React + TypeScript (frontend), Node.js (backend), and PostgreSQL (database).

## Features

- User registration and login with password hashing.
- Secure task management (CRUD operations) protected by authentication (JWT).
- View, create, update, and delete tasks.

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt

## Installation and Setup

### Database Setup

1. Create the required tables in your PostgreSQL database:

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    isComplete BOOLEAN DEFAULT FALSE,
    userID UUID,
    FOREIGN KEY (userID) REFERENCES Users(id)
);
```

2. Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=<your_express_port>  (e.g., 8000)
USER=<your_postgres_user>
HOST=<your_postgres_host> (e.g., localhost)
DATABASE=<your_database_name>
PASSWORD=<your_database_password>
DB_PORT=<your_database_port> (e.g., 5432)
JWT_SECRET=<your_jwt_secret>  (Generate a strong, random secret)
```

### Backend Setup

1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `nodemon server`

### Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend`
2. Create a `.env` file and add the backend URL:

```
REACT_APP_API_URL=http://localhost:8000  (Replace with your backend URL)
```

3. Install dependencies: `npm install`
4. Start the frontend: `npm run start`



## Usage

After starting both the frontend and backend, you can access the application in your browser. You will be able to register a new user, log in, and then manage your tasks.


## Salary Expectations

$4000-$4800/month






