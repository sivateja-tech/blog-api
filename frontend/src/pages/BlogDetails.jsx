import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../api';
import { useAuth } from '../context/AuthContext';

export const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch blog data by ID on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogAPI.getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError(err.message || 'Could not load article');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmed) return;

    try {
      await blogAPI.deleteBlog(id, token);
      alert('Blog deleted successfully');
      navigate('/');
    } catch (err) {
      alert(err.message || 'Failed to delete blog');
    }
  };

  if (loading) {
    return <div className="container status-message">Loading blog details...</div>;
  }

  if (error || !blog) {
    return (
      <div className="container page-container">
        <Link to="/" className="back-link">
          &larr; Back to all blogs
        </Link>
        <div className="error-banner">{error || 'Blog not found'}</div>
      </div>
    );
  }

  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Ownership check: only the author who created the blog can edit or delete it
  const isOwner = Boolean(
    user &&
      ((blog.user_id && blog.user_id === user.id) ||
        (blog.author &&
          (blog.author.toLowerCase() === user.email?.toLowerCase() ||
            blog.author.toLowerCase() === user.name?.toLowerCase())))
  );

  return (
    <div className="container page-container">
      <Link to="/" className="back-link">
        &larr; Back to all articles
      </Link>

      <article className="article-details">
        <header className="article-header">
          <h1 className="article-title">{blog.title}</h1>
          <div className="article-meta-row">
            <p className="article-meta">
              Written by <strong>{blog.author || 'Anonymous'}</strong> &bull; {formattedDate}
            </p>

            {isOwner && (
              <div className="article-actions">
                <Link to={`/edit/${blog.id}`} className="btn btn-secondary btn-sm">
                  Edit
                </Link>
                <button onClick={handleDelete} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="article-content">{blog.content}</div>
      </article>
    </div>
  );
};
