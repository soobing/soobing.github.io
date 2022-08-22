import React from 'react';
import { Link } from 'gatsby';
import './horizontal.scss';
import './vertical.scss';

function Navigation({ type = 'horizontal' }) {
  const routes = [
    { path: '/', name: 'HOME' },
    { path: '/about', name: 'ABOUT' },
    { path: '/posts', name: 'POSTS' },
  ];

  const isActive = (path) => ({ location: { pathname } }) => {
    return path === pathname ? { className: 'active' } : {};
  };
  return (
    <nav className={`${type}-navigation`}>
      <hr className="line" />
      <ul className="list">
        {routes.map(({ path, name }) => (
          <li key={`nav-${path}`}>
            <Link to={path} getProps={isActive(path)}>
              <span className="label">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
