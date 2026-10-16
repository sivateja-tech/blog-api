import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();

  // Format creation timestamp cleanly
  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  // Truncate long content for card excerpt preview
  const excerpt =
    blog.content && blog.content.length > 130
      ? `${blog.content.substring(0, 130)}...`
      : blog.content;

  // Ownership check: only the true author of this blog can edit or delete it
  const isOwner = Boolean(
    user &&
      ((blog.user_id && blog.user_id === user.id) ||
        (blog.author &&
          (blog.author.toLowerCase() === user.email?.toLowerCase() ||
            blog.author.toLowerCase() === user.name?.toLowerCase())))
  );

  return (
    <article className="card blog-card">
      <div className="card-header">
        <h3 className="blog-title">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>
        <p className="blog-meta">
          By <strong>{blog.author || 'Anonymous'}</strong> &bull; {formattedDate}
        </p>
      </div>

      <p className="blog-excerpt">{excerpt}</p>

      <div className="card-footer">
        <Link to={`/blogs/${blog.id}`} className="read-more-link">
          Read Full Post &rarr;
        </Link>

        {isOwner && (
          <div className="card-actions">
            <Link to={`/edit/${blog.id}`} className="btn btn-secondary btn-sm">
              Edit
            </Link>
            <button
              onClick={() => onDelete(blog.id, blog.title)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
