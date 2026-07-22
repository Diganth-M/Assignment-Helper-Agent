import React from 'react';

const ReadingToolbar = ({ 
  title, 
  viewMode, setViewMode, 
  textSize, setTextSize, 
  theme, setTheme, 
  onBack, onAnalyze,
  toggleTOC, toggleNotes, toggleSearch 
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : '#fff',
      borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      backdropFilter: 'blur(12px)',
      zIndex: 10
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: theme === 'dark' ? '#fff' : '#000', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            marginRight: '0.5rem',
            borderRadius: '50%',
            transition: 'background 0.2s ease'
          }}
          title="Back"
          onMouseOver={(e) => e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={toggleTOC}
          style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
          title="Toggle Table of Contents"
        >
          📑
        </button>
        <h2 style={{ margin: 0, fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
          {title}
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* View Mode Tabs */}
        <div style={{ display: 'flex', background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : '#f1f5f9', borderRadius: '4px', padding: '2px' }}>
          <button 
            onClick={() => setViewMode('structured')}
            style={{
              padding: '0.4rem 1rem',
              border: 'none',
              background: viewMode === 'structured' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'structured' ? '#fff' : (theme === 'dark' ? '#aaa' : '#555'),
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            Structured Content
          </button>
          <button 
            onClick={() => setViewMode('pdf')}
            style={{
              padding: '0.4rem 1rem',
              border: 'none',
              background: viewMode === 'pdf' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'pdf' ? '#fff' : (theme === 'dark' ? '#aaa' : '#555'),
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            Original PDF
          </button>
        </div>

        {/* Tools */}
        {viewMode === 'structured' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ padding: '0.5rem', background: 'transparent', border: 'none' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : '#f1f5f9', borderRadius: '4px', padding: '2px' }}>
                <button 
                  onClick={() => setTextSize('small')}
                  style={{ border: 'none', background: textSize === 'small' ? 'rgba(255,255,255,0.1)' : 'transparent', color: theme === 'dark' ? '#fff' : '#000', cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '2px', fontSize: '0.8rem' }}
                >
                  A-
                </button>
                <button 
                  onClick={() => setTextSize('medium')}
                  style={{ border: 'none', background: textSize === 'medium' ? 'rgba(255,255,255,0.1)' : 'transparent', color: theme === 'dark' ? '#fff' : '#000', cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '2px', fontSize: '0.9rem' }}
                >
                  A
                </button>
                <button 
                  onClick={() => setTextSize('large')}
                  style={{ border: 'none', background: textSize === 'large' ? 'rgba(255,255,255,0.1)' : 'transparent', color: theme === 'dark' ? '#fff' : '#000', cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '2px', fontSize: '1.1rem' }}
                >
                  A+
                </button>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={toggleSearch}
              style={{ padding: '0.5rem', background: 'transparent', border: 'none' }}
              title="Search"
            >
              🔍
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={toggleNotes}
              style={{ padding: '0.5rem', background: 'transparent', border: 'none' }}
              title="Notes"
            >
              📝
            </button>
          </div>
        )}

        <button 
          className="btn btn-primary" 
          onClick={onAnalyze}
          style={{ padding: '0.5rem 1.5rem', fontSize: '0.95rem' }}
        >
          Analyze & Generate
        </button>
      </div>
    </div>
  );
};

export default ReadingToolbar;
