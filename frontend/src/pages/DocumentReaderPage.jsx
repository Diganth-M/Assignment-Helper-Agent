import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import DocumentTableOfContents from '../components/reader/DocumentTableOfContents';
import StructuredContentRenderer from '../components/reader/StructuredContentRenderer';
import PdfPreview from '../components/reader/PdfPreview';
import ReadingToolbar from '../components/reader/ReadingToolbar';
import NotesPanel from '../components/reader/NotesPanel';
import DocumentSearch from '../components/reader/DocumentSearch';
import { useChatbot } from '../context/ChatbotContext';
import { defaultDocuments } from '../data/defaultDocuments';

const DocumentReaderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openChatbot } = useChatbot();
  
  const [documentContent, setDocumentContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [viewMode, setViewMode] = useState('structured'); // 'structured' or 'pdf'
  const [textSize, setTextSize] = useState('medium'); // 'small', 'medium', 'large'
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  
  const [activeChapter, setActiveChapter] = useState('');
  const [readingProgress, setReadingProgress] = useState(null);
  
  const [showNotes, setShowNotes] = useState(false);
  const [showTOC, setShowTOC] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  
  const contentRef = useRef(null);

  useEffect(() => {
    loadDocumentData();
  }, [id]);

  const loadDocumentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docResponse = await api.get(`/default-documents/${id}/content`);
      const content = typeof docResponse.data === 'string' ? JSON.parse(docResponse.data) : docResponse.data;
      setDocumentContent(content);
      
      if (content.chapters && content.chapters.length > 0) {
        setActiveChapter(content.chapters[0].id);
      }
      
      try {
        const progressResponse = await api.get(`/default-documents/${id}/progress`);
        setReadingProgress(progressResponse.data);
        if (progressResponse.data.lastOpenedChapter) {
          setActiveChapter(progressResponse.data.lastOpenedChapter);
          // Small delay to let rendering finish before scrolling
          setTimeout(() => scrollToChapter(progressResponse.data.lastOpenedChapter), 500);
        }
      } catch (e) {
        console.warn("Could not load reading progress", e);
      }
      
    } catch (err) {
      console.error(err);
      setError('Unable to load document content.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      const response = await api.post(`/documents/default-documents/${id}/analyze`);
      const documentId = response?.data?.documentId || response?.data?.id;
      if (documentId) {
        navigate(`/document/${documentId}`);
      }
    } catch (err) {
      alert('Failed to analyze document: ' + (err.response?.data?.error || err.message));
    }
  };

  const scrollToChapter = (chapterId) => {
    setActiveChapter(chapterId);
    
    // Save progress
    if (readingProgress) {
        const newProgress = { ...readingProgress, lastOpenedChapter: chapterId };
        setReadingProgress(newProgress);
        api.post(`/default-documents/${id}/progress`, newProgress).catch(console.error);
    }
    
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element && contentRef.current) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const toggleChapterCompletion = (chapterId) => {
    if (!readingProgress) return;
    
    const completed = readingProgress.completedChapters || [];
    const isCompleted = completed.includes(chapterId);
    
    let newCompleted;
    if (isCompleted) {
        newCompleted = completed.filter(c => c !== chapterId);
    } else {
        newCompleted = [...completed, chapterId];
    }
    
    const newProgressPercentage = Math.round((newCompleted.length / (documentContent.chapters?.length || 1)) * 100);
    
    const newProgress = { 
        ...readingProgress, 
        completedChapters: newCompleted,
        progressPercentage: newProgressPercentage
    };
    
    setReadingProgress(newProgress);
    api.post(`/default-documents/${id}/progress`, newProgress).catch(console.error);
  };

  const handleAskAi = (chapterContext) => {
    openChatbot();
    // Dispatch custom event that ChatbotPanel can listen to
    window.dispatchEvent(new CustomEvent('chatbot-prefill', { 
        detail: { 
            message: `Explain this chapter from ${documentContent.title}:\n\nChapter: ${chapterContext.title}` 
        }
    }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
        <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: '#fff', marginTop: '1rem' }}>Loading document content...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !documentContent) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>
        <h2>{error || 'Document content is empty.'}</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/default-documents/${id}`)}>Return</button>
          <button className="btn btn-primary" onClick={loadDocumentData}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme === 'dark' ? 'transparent' : '#f8fafc',
      color: theme === 'dark' ? '#fff' : '#0f172a',
      transition: 'all 0.3s ease'
    }}>
      {/* Header / Toolbar */}
      <ReadingToolbar 
        title={documentContent.title}
        viewMode={viewMode}
        setViewMode={setViewMode}
        textSize={textSize}
        setTextSize={setTextSize}
        theme={theme}
        setTheme={setTheme}
        onBack={() => navigate(`/default-documents/${id}`)}
        onAnalyze={handleAnalyze}
        toggleTOC={() => setShowTOC(!showTOC)}
        toggleNotes={() => setShowNotes(!showNotes)}
        toggleSearch={() => setShowSearch(!showSearch)}
      />

      {/* Main Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* Left: Table of Contents */}
        {showTOC && viewMode === 'structured' && (
          <div style={{ 
            width: '280px', 
            borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#fff',
            backdropFilter: 'blur(12px)',
            overflowY: 'auto'
          }}>
            <DocumentTableOfContents 
              chapters={documentContent.chapters} 
              activeChapter={activeChapter}
              onChapterClick={scrollToChapter}
              progress={readingProgress}
            />
          </div>
        )}

        {/* Center: Content */}
        <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            position: 'relative',
            padding: viewMode === 'structured' ? '2rem 4rem' : '0'
        }} ref={contentRef}>
            
            {showSearch && viewMode === 'structured' && (
                <DocumentSearch 
                    contentRef={contentRef} 
                    onClose={() => setShowSearch(false)} 
                    theme={theme}
                />
            )}
            
            {viewMode === 'structured' ? (
                <StructuredContentRenderer 
                    chapters={documentContent.chapters}
                    activeChapter={activeChapter}
                    textSize={textSize}
                    theme={theme}
                    onAskAi={handleAskAi}
                    onToggleComplete={toggleChapterCompletion}
                    completedChapters={readingProgress?.completedChapters || []}
                />
            ) : (
                <PdfPreview documentKey={id} />
            )}
        </div>

        {/* Right: Notes & Quick Actions */}
        {showNotes && viewMode === 'structured' && (
          <div style={{ 
            width: '320px', 
            borderLeft: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#fff',
            backdropFilter: 'blur(12px)',
            overflowY: 'auto'
          }}>
            <NotesPanel 
                documentKey={id} 
                activeChapter={activeChapter} 
                theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReaderPage;
