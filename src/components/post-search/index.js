import React, { useState, useMemo } from 'react';
import { navigate } from 'gatsby';
import './style.scss';

const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

function PostSearch({ posts }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!query) return [];
    return posts.filter(
      ({ title, categories }) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        categories.toLowerCase().includes(query.toLowerCase())
    );
  }, [posts, query]);

  const handleSelect = (post) => {
    navigate(post.slug);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="search-wrapper">
      <div className="search-input-wrapper">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder="검색..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>
      {isOpen && filteredPosts.length > 0 && (
        <ul className="search-results">
          {filteredPosts.map((post, index) => (
            <li key={index} onClick={() => handleSelect(post)}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
      {isOpen && query && filteredPosts.length === 0 && (
        <div className="no-results">해당하는 글이 없습니다.</div>
      )}
    </div>
  );
}

export default PostSearch;
