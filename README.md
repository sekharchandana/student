# Full-Stack Task Manager Application

A simple full-stack application built with HTML/CSS/JavaScript frontend, Node.js backend, and MongoDB database.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Modern and responsive UI
- ✅ RESTful API endpoints
- ✅ MongoDB database integration

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Mongoose (MongoDB ODM), CORS, dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or MongoDB Atlas account)

## Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string if needed:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/taskmanager
     ```
   - For MongoDB Atlas, use your connection string:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
     ```

4. **Start MongoDB**
   - If using local MongoDB, make sure MongoDB service is running
   - For Windows: MongoDB should start automatically if installed as a service
   - For Linux/Mac: `sudo systemctl start mongod` or `brew services start mongodb-community`

5. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - You should see the Task Manager application

## Project Structure

```
.
├── backend/              # Backend folder
│   └── server.js        # Express server and API routes
├── frontend/            # Frontend folder
│   ├── index.html       # Main HTML file
│   ├── styles.css       # CSS styles
│   └── script.js        # JavaScript for frontend logic
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (create from .env.example)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Add a Task**: Enter a task title (and optional description) in the form and click "Add Task"
2. **Mark Complete**: Click "Mark Complete" to toggle task completion status
3. **Edit Task**: Click "Edit" to modify task title and description
4. **Delete Task**: Click "Delete" to remove a task

## Troubleshooting

- **Cannot connect to MongoDB**: Make sure MongoDB is running and the connection string in `.env` is correct
- **Port already in use**: Change the PORT in `.env` to a different port (e.g., 3001)
- **CORS errors**: The server is configured with CORS, but if issues persist, check your browser console

## License

ISC

