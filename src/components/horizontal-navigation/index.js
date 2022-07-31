import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function HorizontalNavigation() {
  const routes = [
    { path: '/', name: 'HOME' },
    { path: '/about', name: 'ABOUT' },
    { path: '/posts', name: 'POSTS' },
  ];

  const refineSlash = (value = '') => value.replace('/', '');
  const isCurrentPath = (path) => refineSlash(path) === refineSlash(window?.location.pathname);

  return (
    <nav className="horizontal-navigation">
      <hr className="line" />
      <ul className="list">
        {routes.map(({ path, name }) => (
          <li key={`nav-${path}`}>
            <Link to={path} className={isCurrentPath(path) ? 'active' : ''}>
              <span className="label">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HorizontalNavigation;
