import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function HorizontalNavigation() {
  const routes = [
    { path: '/', name: 'HOME' },
    { path: '/about', name: 'ABOUT' },
    { path: '/posts', name: 'POSTS' },
  ];
  return (
    <nav className="horizontal-navigation">
      <hr className="line" />
      <ul className="list">
        {routes.map(({ path, name }) => (
          <li>
            <Link to={path} className="active">
              <span className="label">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HorizontalNavigation;
