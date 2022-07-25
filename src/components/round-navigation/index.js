import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { throttle } from '../../utils/helpers';
import './style.scss';

function RoundNavigation() {
  const [angle, setAngle] = useState(0);
  const navRef = useRef(null);

  const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    const dy = y2 - y1;
    const dx = x2 - x1;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  useEffect(() => {
    const rect = navRef.current.getBoundingClientRect();
    const centerPos = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    const onMouseMove = throttle((e) => {
      const calculated = getAngle({ x: e.clientX, y: e.clientY }, centerPos);
      const angle = calculated > 0 ? calculated - 90 : calculated + 270;
      setAngle(angle);
    }, 50);
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  return (
    <nav ref={navRef} className="round-navigation__wrapper">
      <span
        className="current-line"
        style={{ transform: `translate(-50%, 0%) rotate(${angle}deg)` }}
      />
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
