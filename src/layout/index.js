import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import ClaudeLog from '../components/claude-log';
import './style.scss';

const Layout = ({ showHeader = true, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
            social {
              github
            }
          }
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

  return (
    <div className="page-wrapper">
      {showHeader && <PageHeader siteTitle={title || `Title`} />}
      <main className="page-content">{children}</main>
      <PageFooter
        author={author.name || `Author`}
        githubUrl={author.social?.github || `https://www.github.com`}
      />
      <ClaudeLog />
    </div>
  );
};

export default Layout;
