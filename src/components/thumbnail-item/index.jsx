import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => {
  console.log(node);
  return < Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug} >
    <div key={node.fields.slug}>
      <h3>{node.frontmatter.title || node.fields.slug}</h3>
      <img src={node.frontmatter.thumbnail.childImageSharp.fixed.src} />
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link >
}
