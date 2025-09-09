# Project Setup Instructions

This project is organized as a monorepo with two main folders:

- **backend/** — Node.js/Express server
- **frontend/** — React application

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/KevinTan02/video-streaming-category-browser.git
cd video-streaming-category-browser
```

### Start the Backend

```bash
cd backend
npm install
npm start
```

The backend server will run at: **http://localhost:3001**

### Start the Frontend

Open a new terminal in the root folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend app will run at: **http://localhost:3000**

## Running Tests

From the `frontend/` directory, run:

```bash
npm test
```
