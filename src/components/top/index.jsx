import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import P5Wrapper from 'react-p5-wrapper';
import Wave from "../wave"
import './index.scss'
import styled from "@emotion/styled"
const Wrapper = styled.div`
  & > div {
    /* background: red; */
    height: 60px;
    & > canvas {
      position: absolute;
      right: 0;
    }
  }
`
const Home = styled.div`
  position: absolute;
  z-index: 1;
`
export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <Wrapper className="top">
      {!isRoot && (
        <Home>
          <Link to={`/`} className="link">
            {title}
          </Link>
        </Home>

      )}
      {typeof window !== 'undefined' && <P5Wrapper sketch={Wave} />}
    </Wrapper>
  )
}
