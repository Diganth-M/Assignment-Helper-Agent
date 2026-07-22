import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultDocuments } from '../data/defaultDocuments';
import api from '../services/api';

const DefaultDocumentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  
  const document = defaultDocuments.find(doc => doc.id === id);

  if (!document) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>
        <h2>Default document not found.</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/default-documents')} style={{ marginTop: '1rem' }}>
          Back to Default Documents
        </button>
      </div>
    );
  }

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      setProgressStatus('Loading default document...');
      await new Promise(r => setTimeout(r, 600)); // Simulate UI step
      setProgressStatus(`Preparing ${document.title}...`);
      await new Promise(r => setTimeout(r, 600)); // Simulate UI step
      setProgressStatus('Uploading document...');
      await new Promise(r => setTimeout(r, 600)); // Simulate UI step
      
      const response = await api.post(`/documents/default-documents/${id}/analyze`);
      
      const documentId = response?.data?.documentId || response?.data?.id;
      if (!documentId) {
        throw new Error("Analysis succeeded but document ID was not returned.");
      }
      
      setProgressStatus('Extracting document content...');
      await new Promise(r => setTimeout(r, 600)); // Simulate UI step
      setProgressStatus('Analyzing chapters...');
      await new Promise(r => setTimeout(r, 600)); // Simulate UI step
      setProgressStatus('Preparing generation tools...');
      await new Promise(r => setTimeout(r, 500)); // Simulate UI step
      setProgressStatus('Analysis completed successfully.');
      await new Promise(r => setTimeout(r, 500)); // Simulate UI step
      
      navigate(`/document/${documentId}`);
    } catch (error) {
      console.error('Failed to analyze default document:', error);
      alert('Analysis failed: ' + (error.response?.data?.error || error.response?.data || error.message));
      setAnalyzing(false);
      setProgressStatus('');
    }
  };

  const handleRead = () => {
    navigate(`/default-documents/${id}/read`);
  };

  return (
    <div className="animate-fade-in" style={{
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      minHeight: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/default-documents')}
          style={{ 
            background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            marginRight: '1rem'
          }}
          disabled={analyzing}
          title="Back to Default Documents"
          onMouseOver={(e) => {
             e.currentTarget.style.background = 'var(--accent-primary)';
             e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }}
          onMouseOut={(e) => {
             e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Back to Default Documents</span>
      </div>

      <div style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--accent-gradient)' }} />
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ 
            fontSize: '5rem', 
            background: 'rgba(0,0,0,0.3)', 
            padding: '1.5rem', 
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {document.icon}
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '2.5rem' }}>{document.title}</h1>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'normal', margin: '0 0 1.5rem 0' }}>
              Read the complete built-in learning document or analyze it to generate personalized study materials.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>
                {document.topic}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '4px 12px', borderRadius: '4px' }}>
                Default Document
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
              {document.description}
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          padding: '2rem 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>Chapters</h4>
            <p style={{ color: '#fff', fontSize: '1.25rem', margin: 0, fontWeight: 'bold' }}>{document.chapters}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>Estimated Reading Time</h4>
            <p style={{ color: '#fff', fontSize: '1.25rem', margin: 0, fontWeight: 'bold' }}>{document.readingTime}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>File Type</h4>
            <p style={{ color: '#fff', fontSize: '1.25rem', margin: 0, fontWeight: 'bold' }}>{document.fileType}</p>
          </div>
        </div>

        {analyzing ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem auto', width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>{progressStatus}</h3>
            <div style={{ 
              width: '100%', 
              maxWidth: '400px', 
              height: '6px', 
              background: 'rgba(255,255,255,0.1)', 
              margin: '1.5rem auto 0', 
              borderRadius: '3px',
              overflow: 'hidden' 
            }}>
              <div style={{ height: '100%', width: '100%', background: 'var(--accent-gradient)', animation: 'progress 3.5s ease-in-out forwards' }} />
            </div>
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
            `}</style>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={handleRead}>
              Read Content
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={handleAnalyze}>
              Analyze & Generate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultDocumentDetailsPage;
