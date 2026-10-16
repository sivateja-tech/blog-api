import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { BlogDetails } from './pages/BlogDetails';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import './App.css';

// Simple 404 component
const NotFound = () => (
  <div className="container status-message">
    <h2>404 - Page Not Found</h2>
    <p>The page you requested does not exist.</p>
    <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
      Return to Home
    </Link>
  </div>
);

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes (Require Login) */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container footer-content">
              <p>&copy; {new Date().getFullYear()} DevBlog Management System</p>
              <p>Built with React 18 &amp; Express REST API</p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
