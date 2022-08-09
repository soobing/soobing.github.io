import React from 'react';
import './style.scss';

function PostContent({ html }) {
  return (
    <div className="post-content">
      <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="divider" />
    </div>
  );
}

export default PostContent;
