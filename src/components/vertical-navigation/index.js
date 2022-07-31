import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function VerticalNavigation() {
  return (
    <nav className="vertical-navigation">
      <hr className="line" />
      <ul className="list">
        <li>
          <Link to="/" className="active">
            <span className="label">HOME</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <span className="label">ABOUT</span>
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <span className="label">POSTS</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default VerticalNavigation;
