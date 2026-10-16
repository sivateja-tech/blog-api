import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { useAuth } from '../context/AuthContext';

export const CreateBlog = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    author: user?.name || user?.email || '',
    content: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newBlog = await blogAPI.createBlog(formData, token);
      alert('Article created successfully!');
      navigate(`/blogs/${newBlog.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create article');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container form-page-container">
      <Link to="/" className="back-link">
        &larr; Back to all blogs
      </Link>

      <div className="card form-card">
        <h2 className="form-title">Create New Article</h2>
        <p className="form-subtitle">Share your ideas and tutorials with others</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="standard-form">
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Introduction to Node.js REST APIs"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="e.g. Siva Teja"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              placeholder="Write your article body here..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
