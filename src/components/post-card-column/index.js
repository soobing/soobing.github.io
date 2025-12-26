import { navigate } from 'gatsby-link';
import React, { useCallback } from 'react';
import PostCard from '../post-card';
import './style.scss';

function PostCardColumn({ posts, showMoreButton, moreUrl }) {
  const onMoreButtonClick = useCallback(() => {
    navigate(moreUrl);
  }, [moreUrl]);

  return (
    <div className="post-card-column-wrapper">
      <div className="post-card-column">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
        {showMoreButton && (
          <button
            className="more-post-card-button"
            onClick={onMoreButtonClick}
          >
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCardColumn;
