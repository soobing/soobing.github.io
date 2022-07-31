import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Post from '../../models/post';
import PostSearch from '../post-search';
import Navigation from '../horizontal-navigation';
import './style.scss';

function PageHeader({ siteTitle }) {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
            edges {
              node {
                frontmatter {
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <header className="page-header-wrapper">
          <div className="page-header">
            <div className="front-section">
              <Link className="link" to="/">
                {siteTitle}
              </Link>
            </div>
            <Navigation />
            {/*  TODO: search 구현 방법 참고하기 
            <div className="trailing-section">
              <Link className="link" to="/about">
                about
              </Link>
              <Link className="link" to="/posts">
                posts
              </Link>
              
              <PostSearch
                posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
              />
            </div> */}
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
