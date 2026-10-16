// Base API URL from environment variables, defaults to /api proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Authentication API calls
 */
export const authAPI = {
  // Register a new user: POST /api/auth/register
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  },

  // Login existing user: POST /api/auth/login
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Invalid credentials');
    }
    return data; // Returns { token: 'jwt...' }
  },
};

/**
 * Blog Management CRUD API calls
 */
export const blogAPI = {
  // Get paginated blogs with optional title search: GET /api/blogs?search=...&page=...&limit=...
  getAllBlogs: async (search = '', page = 1, limit = 5) => {
    const query = new URLSearchParams({ search, page, limit });
    const response = await fetch(`${API_BASE_URL}/blogs?${query}`);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch blogs');
    }
    return data; // Returns array of blogs: [{ id, title, content, author, created_at }, ...]
  },

  // Get a single blog by ID: GET /api/blogs/:id
  getBlogById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Blog not found');
    }
    return data;
  },

  // Create a new blog (Protected): POST /api/blogs
  createBlog: async (blogData, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create blog');
    }
    return data;
  },

  // Update existing blog (Protected): PUT /api/blogs/:id
  updateBlog: async (id, blogData, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update blog');
    }
    return data;
  },

  // Delete a blog (Protected): DELETE /api/blogs/:id
  deleteBlog: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete blog');
    }
    return data; // Returns { message: 'Blog deleted successfully' }
  },
};
