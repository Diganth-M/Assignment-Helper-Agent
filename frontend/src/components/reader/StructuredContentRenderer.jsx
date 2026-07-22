import React from 'react';

const StructuredContentRenderer = ({ chapters = [], activeChapter, textSize, theme, onAskAi, onToggleComplete, completedChapters }) => {
  
  const getFontSize = () => {
    switch(textSize) {
      case 'small': return '14px';
      case 'large': return '20px';
      case 'medium':
      default: return '16px';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: getFontSize(), lineHeight: 1.7 }}>
      {chapters.map(chapter => (
        <div 
          key={chapter.id} 
          id={`chapter-${chapter.id}`}
          style={{ 
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ fontSize: '2em', marginBottom: '1.5rem', color: theme === 'dark' ? '#fff' : '#000' }}>
            {chapter.title}
          </h2>
          
          {chapter.content.map((block, index) => {
            switch(block.type) {
              case 'paragraph':
                return <p key={index} style={{ marginBottom: '1.2rem' }}>{block.text}</p>;
              case 'list-bullet':
                return (
                  <ul key={index} style={{ marginBottom: '1.2rem', paddingLeft: '2rem' }}>
                    {block.items.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
                  </ul>
                );
              case 'code':
                return (
                  <div key={index} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        background: 'rgba(255,255,255,0.1)', 
                        padding: '2px 8px', 
                        fontSize: '0.75rem',
                        borderBottomLeftRadius: '4px',
                        color: theme === 'dark' ? '#aaa' : '#555'
                    }}>
                        {block.language}
                    </div>
                    <pre style={{ 
                      background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      overflowX: 'auto',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
                    }}>
                      <code style={{ fontFamily: 'monospace', color: theme === 'dark' ? '#e2e8f0' : '#334155' }}>
                        {block.code}
                      </code>
                    </pre>
                  </div>
                );
              default:
                return null;
            }
          })}
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${completedChapters.includes(chapter.id) ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => onToggleComplete(chapter.id)}
              style={{ fontSize: '0.9rem' }}
            >
              {completedChapters.includes(chapter.id) ? '✓ Completed' : 'Mark as Complete'}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onAskAi(chapter)}
              style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>🤖</span> Ask AI About This Chapter
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StructuredContentRenderer;
