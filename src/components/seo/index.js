import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            ogImage
          }
        }
      }
    `,
  );
  return site.siteMetadata;
}

// Gatsby Head API를 위한 SEO 컴포넌트
export function Seo({ title, description, children }) {
  const siteMetadata = useSiteMetadata();
  const metaDescription = description || siteMetadata.description;
  const metaTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;

  return (
    <>
      <html lang="ko" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:author" content={siteMetadata.author.name} />
      <meta property="og:image" content={siteMetadata.ogImage} />
      <meta property="og:site_name" content={siteMetadata.title} />
      {children}
    </>
  );
}

export default Seo;
