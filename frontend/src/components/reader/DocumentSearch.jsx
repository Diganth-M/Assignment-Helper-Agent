import React, { useState, useEffect } from 'react';

const DocumentSearch = ({ contentRef, onClose, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // A simplified search implementation that uses window.find if available,
  // or a basic text matching for the UI component.
  // In a robust implementation, we would highlight words in the DOM using a library like mark.js.
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Fallback simple search using native window.find
    // Reset selection to start from top if we change search term
    window.getSelection().removeAllRanges();
    if (contentRef.current) {
        contentRef.current.scrollTop = 0;
    }
    
    findNext();
  };
  
  const findNext = () => {
      if (!searchTerm) return;
      const found = window.find(searchTerm, false, false, true, false, true, false);
      if (!found) {
          alert('No more matches found.');
      }
  };
  
  const findPrev = () => {
      if (!searchTerm) return;
      const found = window.find(searchTerm, false, true, true, false, true, false);
      if (!found) {
          alert('No more matches found.');
      }
  };

  return (
    <div style={{
      position: 'sticky',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '0.5rem 1rem',
      borderRadius: '24px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: 'max-content'
    }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ opacity: 0.5 }}>🔍</span>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search inside document..."
          autoFocus
          style={{
            background: 'transparent',
            border: 'none',
            color: theme === 'dark' ? '#fff' : '#000',
            padding: '0.5rem',
            outline: 'none',
            width: '200px'
          }}
        />
        <button type="submit" style={{ display: 'none' }}>Search</button>
      </form>
      
      <div style={{ display: 'flex', gap: '0.2rem', borderLeft: '1px solid rgba(128,128,128,0.3)', paddingLeft: '0.5rem' }}>
          <button 
            onClick={findPrev}
            style={{ background: 'transparent', border: 'none', color: theme === 'dark' ? '#fff' : '#000', cursor: 'pointer', padding: '0.2rem 0.5rem' }}
            title="Previous Match"
          >
            ↑
          </button>
          <button 
            onClick={findNext}
            style={{ background: 'transparent', border: 'none', color: theme === 'dark' ? '#fff' : '#000', cursor: 'pointer', padding: '0.2rem 0.5rem' }}
            title="Next Match"
          >
            ↓
          </button>
      </div>
      
      <button 
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: theme === 'dark' ? '#aaa' : '#666', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '1.2rem', padding: '0 0.5rem' }}
        title="Close Search"
      >
        ×
      </button>
    </div>
  );
};

export default DocumentSearch;
