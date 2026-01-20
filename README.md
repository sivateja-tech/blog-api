# Blog Management REST API

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

## Features
- User Registration & Login (JWT)
- CRUD operations for blog posts
- Protected routes using middleware
- Search blogs by title
- Pagination support
- Proper error handling

## API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Blogs
GET /api/blogs?search=node&page=1&limit=5  
GET /api/blogs/:id  
POST /api/blogs (Protected)  
PUT /api/blogs/:id (Protected)  
DELETE /api/blogs/:id (Protected)

## Run Locally
```bash
npm install
npm start
