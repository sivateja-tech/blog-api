import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { BlogCard } from '../components/BlogCard';

export const Home = () => {
  const { token, isAuthenticated } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6; // Blogs per page

  // Fetch blogs from Express API whenever page changes
  const fetchBlogs = async (searchQuery = search, currentPage = page) => {
    setLoading(true);
    setError('');
    try {
      const data = await blogAPI.getAllBlogs(searchQuery, currentPage, limit);
      setBlogs(data);
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(search, page);
  }, [page]);

  // Handle live search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchBlogs(search, 1);
  };

  // Handle post deletion
  const handleDeleteBlog = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    try {
      await blogAPI.deleteBlog(id, token);
      // Remove deleted blog from state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      alert('Blog deleted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to delete blog.');
    }
  };

  return (
    <div className="container page-container">
      {/* Header & Search Bar */}
      <div className="home-header">
        <div>
          <h1 className="page-title">Explore Articles</h1>
          <p className="page-subtitle">Learn, build, and share technical knowledge</p>
        </div>

        {isAuthenticated && (
          <Link to="/create" className="btn btn-primary">
            + New Article
          </Link>
        )}
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setPage(1);
              fetchBlogs('', 1);
            }}
            className="btn btn-secondary"
          >
            Clear
          </button>
        )}
      </form>

      {/* Loading & Error States */}
      {loading && <div className="status-message">Loading articles...</div>}
      {error && <div className="error-banner">{error}</div>}

      {/* Empty State */}
      {!loading && !error && blogs.length === 0 && (
        <div className="empty-box">
          <h3>No articles found</h3>
          <p>
            {search
              ? `No blogs matching "${search}". Try another keyword!`
              : 'No articles have been published yet.'}
          </p>
        </div>
      )}

      {/* Blogs Grid */}
      {!loading && !error && blogs.length > 0 && (
        <>
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onDelete={handleDeleteBlog} />
            ))}
          </div>

          {/* Simple Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn btn-secondary btn-sm"
            >
              &larr; Previous Page
            </button>
            <span className="page-number">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={blogs.length < limit}
              className="btn btn-secondary btn-sm"
            >
              Next Page &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
};
