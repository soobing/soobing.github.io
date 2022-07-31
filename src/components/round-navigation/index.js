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
    const onMouseMove = throttle((e) => {
      if (!navRef?.current) return;
      const rect = navRef.current.getBoundingClientRect(); // TODO: 성능 최적화 필요
      const centerPos = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      const calculated = getAngle({ x: e.clientX, y: e.clientY }, centerPos);
      const angle = calculated >= 90 && calculated <= 180 ? calculated - 90 : calculated + 270;
      setAngle(angle);
    }, 50);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const orangeSection = {
    home: angle >= 345 || angle <= 15,
    about: angle >= 75 && angle <= 105,
    posts: angle >= 165 && angle <= 195,
  };
  const showOrange = orangeSection.home || orangeSection.about || orangeSection.posts;

  return (
    <nav ref={navRef} className="round-navigation__wrapper">
      <span
        className="current-line"
        style={{ transform: `translate(-50%, 0%) rotate(${angle}deg)` }}
      >
        <span
          className="current-line--orange"
          style={{
            border: `1px solid ${showOrange ? '#FF5C00' : '#585858'}`,
            backgroundColor: `${showOrange ? '#FF5C00' : '#585858'}`,
          }}
        ></span>
      </span>
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
