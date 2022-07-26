import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function VerticalNavigation() {
  return (
    <nav className="vertical-navigation__wrapper">
      <hr className="vertical-navigation__line"/>
      <ul className="vertical-navigation__list">
        <li>
          <Link to="/">
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
