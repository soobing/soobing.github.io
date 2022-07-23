import { Link } from 'gatsby';
import React from 'react';
import './style.scss';

function RoundNavigation() {
  return (
    <nav className="round-navigation__wrapper">
      <span className="current-line" />
      <ul>
        <li className="link link--12">
          <Link to="/">
            <hr className="line" />
            <span className="label">HOME</span>
          </Link>
        </li>
        <li className="link link--3">
          <Link to="/about">
            <hr className="line" />
            <span className="label">ABOUT</span>
          </Link>
        </li>
        <li className="link link--6">
          <Link to="/posts">
            <hr className="line" />
            <span className="label">POSTS</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default RoundNavigation;
