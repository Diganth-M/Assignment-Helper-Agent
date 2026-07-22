import React from 'react';

const DocumentTableOfContents = ({ chapters = [], activeChapter, onChapterClick, progress }) => {
  const completedChapters = progress?.completedChapters || [];
  
  return (
    <div style={{ padding: '1.5rem 1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', opacity: 0.9 }}>Table of Contents</h3>
      
      {progress && (
          <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                  <span>Reading Progress</span>
                  <span>{progress.progressPercentage || 0}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(128,128,128,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress.progressPercentage || 0}%`, background: 'var(--accent-primary)', transition: 'width 0.3s ease' }}></div>
              </div>
          </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          const isCompleted = completedChapters.includes(chapter.id);
          
          return (
            <li key={chapter.id}>
              <button
                onClick={() => onChapterClick(chapter.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  padding: '0.75rem 1rem',
                  color: isActive ? 'var(--accent-primary)' : 'inherit',
                  cursor: 'pointer',
                  borderRadius: '0 4px 4px 0',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ 
                    color: isCompleted ? '#10b981' : (isActive ? 'var(--accent-primary)' : 'gray'),
                    flexShrink: 0
                }}>
                  {isCompleted ? '✓' : '○'}
                </span>
                <span style={{ lineHeight: '1.4' }}>{chapter.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentTableOfContents;
