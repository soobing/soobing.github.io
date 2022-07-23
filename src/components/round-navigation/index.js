import { Link } from 'gatsby';
import React from 'react';
import './style.scss';

function RoundNavigation() {
  return (
    <nav className="round-navigation__wrapper">
      <ul>
        <Link className="link link--12" to="/">
          <span className="link__label">home</span>
        </Link>
        <Link className="link link--3" to="/about">
          <span className="link__label">about</span>
        </Link>
        <Link className="link link--6" to="/posts">
          <span className="link__label">posts</span>
        </Link>
      </ul>
    </nav>
  );
}

export default RoundNavigation;
