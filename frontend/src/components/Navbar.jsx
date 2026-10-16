import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userDisplayName = user?.email || user?.name || 'User';

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          📝 DevBlog
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/create" className="nav-link btn-link">
                + Write Post
              </Link>
              <span className="user-badge" title={userDisplayName}>
                {userDisplayName}
              </span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
