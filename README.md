# Facebook Clone — Full-Stack Social Media Web Application

A full-stack social media application built with React, Node.js, Express, and MongoDB. Originally built in 2023, revived and completed in 2026.

## Features

	•	User registration and login (JWT + bcrypt)
	•	Live feed with image posting
	•	Likes and unlike
	•	Post creation and deletion
	•	Logout (built from scratch, not part of the original tutorial)


## Tech Stack
* Frontend: React, React Router, Context API
* Backend: Node.js, Express, REST APIs
* Database: MongoDB (Mongoose)
* Auth: JWT, bcrypt
* Tools: Git, Github, npm, Claude Code

## What I’d Do Differently or Add

	•	Add token expiry to the auth system
	•	Consider PostgreSQL instead of MongoDB, given how relational the data is
	•	Store uploaded images with unique filenames in proper cloud storage
	•	Add unit and integration tests
	•	Add follow/unfollow UI, search, and profile picture upload

## Architecture

The application follows a client-server architecture:

- A React single-page frontend handles the user interface and communicates
  with the backend over a REST API.
- A Node.js/Express backend exposes REST endpoints for authentication, users,
  and posts, and handles application logic.
- MongoDB stores users and posts, accessed through Mongoose schemas.

The request flow runs from a UI action in React, to an Express REST endpoint,
to the MongoDB database, and back to the frontend.

## Getting Started

### Prerequisites

- Node.js and npm installed
- A MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository:

git clone https://github.com/Zinal-Patel/facebook-clone-project.git


2. Install dependencies for both frontend and backend:

```
cd api
npm install
cd client
npm install
```


3. Create a `.env` file in the backend folder i.e. api folder with your environment variables:

MONGO_URL=your_mongodb_connection_string
PORT=8008


4. Start the backend:

npm start


5. Start the frontend:

npm start


## Project Structure

- `/api` — Node.js/Express backend
	- `/routes` — Express route handlers (auth, users, posts)
	- `/models` — Mongoose schemas (data models)
- `/client` — React application

## Notes

This project was started in 2023, then revived and completed in 2026 -
re-exploring the existing codebase, fixing defects across the front-end and
back-end, and improving it with defensive-programming refactors (such as
null-safety guards on backend routes).


