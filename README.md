# Blog Management Platform (Full-Stack)

A complete full-stack Blog Management web application featuring a **Node.js / Express REST API** backend with **PostgreSQL & JWT authentication**, and a modern, responsive **React 18** frontend.

---

## 📁 Repository Structure

```
blog-api/
├── backend/          # Express REST API, PostgreSQL database & JWT auth
└── frontend/         # React 18 single-page application built with Vite
```

---

## 🚀 Quick Start

### 1. Start the Backend API
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3001
```

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 🛠 Tech Stack

- **Frontend**: React 18, React Router v6, Plain CSS (Variables & Dark Mode), Fetch API, Vite
- **Backend**: Node.js, Express.js, PostgreSQL (`pg`), JWT Authentication (`jsonwebtoken`), `bcrypt`
- **Features**:
  - User Registration & Login with JWT
  - Protected blog creation and editing
  - Resource authorization (only authors can edit or delete their own posts)
  - Blog search by title
  - Pagination support
  - Responsive mobile-first UI with dark mode support
