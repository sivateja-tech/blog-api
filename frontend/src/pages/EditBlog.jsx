import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { useAuth } from '../context/AuthContext';

export const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);

  // Pre-fill form with existing blog data
  useEffect(() => {
    const fetchExistingBlog = async () => {
      try {
        const blog = await blogAPI.getBlogById(id);

        // Check if user is the author
        const isOwner = Boolean(
          user &&
            ((blog.user_id && blog.user_id === user.id) ||
              (blog.author &&
                (blog.author.toLowerCase() === user.email?.toLowerCase() ||
                  blog.author.toLowerCase() === user.name?.toLowerCase())))
        );

        if (blog.user_id && !isOwner) {
          setUnauthorized(true);
          setError('You are not authorized to edit this article.');
          return;
        }

        setFormData({
          title: blog.title || '',
          author: blog.author || '',
          content: blog.content || '',
        });
      } catch (err) {
        setError(err.message || 'Failed to load blog for editing');
      } finally {
        setLoading(false);
      }
    };

    fetchExistingBlog();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await blogAPI.updateBlog(id, formData, token);
      alert('Article updated successfully!');
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update article');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container status-message">Loading article for editing...</div>;
  }

  return (
    <div className="container form-page-container">
      <Link to={`/blogs/${id}`} className="back-link">
        &larr; Back to article
      </Link>

      <div className="card form-card">
        <h2 className="form-title">Edit Article</h2>
        <p className="form-subtitle">Make updates to your article below</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="standard-form">
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              id="title"
              name="title"
              type="text"
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
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/blogs/${id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
