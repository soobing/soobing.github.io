import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import './style.scss';

import Post from '../../models/post';
import PostSearch from '../post-search';

function CategoryPageHeader() {
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
        <div className="category-page-header-wrapper">
          {/* <PostSearch
            posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
          /> */}
        </div>
      )}
    />
  );
}

export default CategoryPageHeader;
