# DevBlog — Student Blog Management Frontend

A simple, responsive, clean frontend for a Blog Management REST API built with **React 18, JavaScript, JSX, Vite, React Router, and plain CSS**.

Created for a final-year Computer Science student preparing for **Associate Frontend Developer / Software Engineer** interviews. The code is structured to be easy to understand and explain line by line.

---

## 📸 Screenshots

| Home Page & Search | Article Details |
| :---: | :---: |
| _[ Insert Home Page Screenshot ]_ | _[ Insert Article Details Screenshot ]_ |

| Create / Edit Article | Login & Register |
| :---: | :---: |
| _[ Insert Form Screenshot ]_ | _[ Insert Login Screenshot ]_ |

---

## 🚀 Features

- **User Authentication**:
  - Register with name, email, and password.
  - Login with JWT authentication.
  - Session saved in `localStorage` so you remain logged in on page reload.
  - Logout functionality.
- **Protected Routes**:
  - Non-logged-in users cannot access `/create` or `/edit/:id` routes.
  - Redirects unauthenticated users to `/login`.
- **Blog Listing & Search**:
  - Displays all blog articles in a responsive grid.
  - Search articles by title using backend query parameter (`/api/blogs?search=...`).
  - Next / Previous page pagination matching backend (`page` and `limit`).
- **Article Details & CRUD**:
  - View full blog post with author and formatted date.
  - Create new blog posts (`POST /api/blogs`).
  - Edit existing blog posts (`PUT /api/blogs/:id`).
  - Delete blog posts (`DELETE /api/blogs/:id`) with browser confirmation.
- **Clean Plain CSS**:
  - CSS variables for light/dark theme support.
  - Mobile-first, responsive on mobile, tablet, and desktop screens.
  - No external UI libraries like Bootstrap or MUI.

---

## 🛠 Tech Stack

- **Frontend Library**: React 18
- **Language**: JavaScript (ES6+), JSX
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Plain CSS (CSS Variables)
- **HTTP Client**: Native Fetch API (no Axios)
- **Backend API**: Node.js, Express, PostgreSQL, JWT

---

## 📁 Project Folder Structure

```
frontend/
├── index.html              # HTML entry file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite config
├── .env.example            # Environment variables template
├── .env                    # Local environment variables
├── README.md               # Documentation
└── src/
    ├── index.css           # Global resets and CSS variables
    ├── App.css             # Component and layout styling
    ├── main.jsx            # React root entry point
    ├── App.jsx             # React Router routes and layout
    ├── api.js              # Native fetch helper functions for API calls
    ├── context/
    │   └── AuthContext.jsx # Global auth state (token, login, logout)
    ├── components/
    │   ├── Navbar.jsx      # Top navigation bar
    │   ├── BlogCard.jsx    # Blog card component
    │   └── ProtectedRoute.jsx # Route protection wrapper
    └── pages/
        ├── Home.jsx        # Blog list, search, and pagination
        ├── BlogDetails.jsx # Single blog post view
        ├── CreateBlog.jsx  # New blog post form
        ├── EditBlog.jsx    # Edit existing blog post
        ├── Login.jsx       # User login form
        └── Register.jsx    # User registration form
```

---

## ⚙️ Setup and Installation

### 1. Prerequisites
- Node.js (v18 or higher)
- Your backend Express API running on `http://localhost:5000`

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `frontend` folder (or copy from `.env.example`):
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 💡 How to Explain This Project in Interviews

1. **How does the frontend communicate with the backend?**  
   *Answer:* "All API calls are organized in `src/api.js` using native `fetch`. We send JSON payloads to the Express REST endpoints and attach `Authorization: Bearer <token>` headers for protected routes."

2. **How does authentication work?**  
   *Answer:* "We use React Context in `AuthContext.jsx`. When the user logs in, the backend returns a JWT token. We save it in React state and in `localStorage`. Any component can access `token`, `login`, and `logout` via the custom `useAuth()` hook."

3. **How are routes protected?**  
   *Answer:* "We created a `ProtectedRoute` component. It checks if `isAuthenticated` is true from `AuthContext`. If the user is logged in, it renders the page; otherwise, it redirects them to `/login`."

4. **Why did you use Plain CSS instead of a UI library?**  
   *Answer:* "To demonstrate strong fundamentals in responsive CSS layout, CSS Grid, Flexbox, and CSS variables without relying on heavy external dependencies."

5. **How does search and pagination work?**  
   *Answer:* "The backend accepts query parameters (`/api/blogs?search=...&page=...&limit=5`). In `Home.jsx`, we maintain `search` and `page` in local state, and call `getAllBlogs(search, page, limit)` on form submit or pagination button click."
