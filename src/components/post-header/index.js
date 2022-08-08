import { Link } from 'gatsby';
import React from 'react';
import './style.scss';

function PostHeader({ post, viewCount }) {
  return (
    <header className="post-header">
      <h1 className="title">{post.title}</h1>
      <div className="info">
        {post.date} |
        <div className="categories">
          {post.categories.map((category) => (
            <Link className="category" key={category} to={`/posts/${category}`}>
              {category}
            </Link>
          ))}
        </div>
        {/* {viewCount && ` · ${viewCount} views`} */}
      </div>
    </header>
  );
}
export default PostHeader;
