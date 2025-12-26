import React, { useMemo, useState, useEffect } from 'react';
import PostCardColumn from '../post-card-column';
import './style.scss';

function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  return (
    <div className="post-tabs-wrapper">
      <div className="post-tabs">
        <div className="custom-tabs" role="tablist">
          {tabs.map((title, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={tabIndex === index}
              className={`custom-tab ${tabIndex === index ? 'active' : ''}`}
              onClick={(e) => onChange(e, index)}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, 4) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > 4}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
      />
    </div>
  );
}
export default PostTabs;
