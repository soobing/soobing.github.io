import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { throttle } from '../utils/helpers';
import Layout from '../layout';
import Seo from '../components/seo';
import MainTitle from '../components/main-title';
import RoundNavigation from '../components/round-navigation';
import Navigation from '../components/navigation';

function HomePage({ data }) {
  const [isSmallView, setIsSmallView] = useState(true);
  useEffect(() => {
    const onResize = throttle(() => {
      setIsSmallView(window.innerWidth < 500);
    }, 100);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <Layout showHeader={false}>
      <Seo title="Home" />
      <div className="main-page">
        <section className="content">
          <MainTitle />
          {isSmallView ? <Navigation type="vertical" /> : <RoundNavigation />}
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 500, truncate: true)
          frontmatter {
            categories
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }

    site {
      siteMetadata {
        language
        author {
          name
          bio {
            role
            description
          }
          social {
            github
            linkedIn
            email
          }
        }
      }
    }
  }
`;
