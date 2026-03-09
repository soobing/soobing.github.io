import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './style.scss';

function parseLogEntries(rawMarkdown) {
  const entries = [];
  const lines = rawMarkdown.split('\n');
  let currentDate = '';
  let currentEmoji = '';
  let textLines = [];

  for (const line of lines) {
    const headerMatch = line.match(/^## (\d{4}-\d{2}-\d{2})\s*(.*)/);
    if (headerMatch) {
      if (currentDate) {
        entries.push({
          date: currentDate,
          emoji: currentEmoji,
          text: textLines.join(' ').trim(),
        });
        textLines = [];
      }
      currentDate = headerMatch[1];
      const rest = headerMatch[2].trim();
      currentEmoji = rest.split(/\s+/)[0] || '';
    } else if (currentDate && line.trim() && !line.startsWith('---')) {
      textLines.push(line.trim());
    }
  }

  if (currentDate) {
    entries.push({
      date: currentDate,
      emoji: currentEmoji,
      text: textLines.join(' ').trim(),
    });
  }

  return entries;
}

function ClaudeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <g stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none">
        <line x1="14" y1="2" x2="14" y2="10" />
        <line x1="14" y1="18" x2="14" y2="26" />
        <line x1="2" y1="14" x2="10" y2="14" />
        <line x1="18" y1="14" x2="26" y2="14" />
        <line x1="5.51" y1="5.51" x2="11.05" y2="11.05" />
        <line x1="16.95" y1="16.95" x2="22.49" y2="22.49" />
        <line x1="22.49" y1="5.51" x2="16.95" y2="11.05" />
        <line x1="11.05" y1="16.95" x2="5.51" y2="22.49" />
      </g>
      <circle cx="14" cy="14" r="3.5" fill="white" />
    </svg>
  );
}

function ClaudeLog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const data = useStaticQuery(graphql`
    query ClaudeLogQuery {
      markdownRemark(frontmatter: { type: { eq: "claude-log" } }) {
        rawMarkdownBody
      }
    }
  `);

  if (!mounted) return null;

  const rawMarkdown = data?.markdownRemark?.rawMarkdownBody || '';
  const entries = parseLogEntries(rawMarkdown);

  return (
    <div className="claude-log-wrapper">
      {isOpen && (
        <div className="claude-log-panel" role="dialog" aria-label="Claude Code Log">
          <div className="claude-log-header">
            <div className="claude-log-title">
              <span className="claude-log-indicator" aria-hidden="true" />
              Claude Code Log
            </div>
            <button
              className="claude-log-close"
              onClick={() => setIsOpen(false)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
          <div className="claude-log-body">
            {entries.length === 0 ? (
              <div className="claude-log-empty">아직 로그가 없습니다.</div>
            ) : (
              <div>
                {entries.map((entry, i) => (
                  <div
                    key={i}
                    className="claude-log-entry"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <p className="claude-log-entry-text">{entry.text}</p>
                    <time className="claude-log-entry-date" dateTime={entry.date}>
                      {entry.date}
                    </time>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <button
        className={`claude-log-button ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Claude Code Log 열기"
        aria-expanded={isOpen}
      >
        <ClaudeIcon />
      </button>
    </div>
  );
}

export default ClaudeLog;
