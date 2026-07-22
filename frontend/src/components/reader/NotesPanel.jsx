import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const NotesPanel = ({ documentKey, activeChapter, theme }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentKey) {
        fetchNotes();
    }
  }, [documentKey]);

  const fetchNotes = async () => {
    try {
        setLoading(true);
        const res = await api.get(`/default-documents/${documentKey}/notes`);
        setNotes(res.data);
    } catch (err) {
        console.error("Failed to load notes", err);
    } finally {
        setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!newNote.trim()) return;
    try {
        const res = await api.post(`/default-documents/${documentKey}/notes`, {
            chapterId: activeChapter || 'general',
            noteText: newNote,
            isBookmark: false
        });
        setNotes([...notes, res.data]);
        setNewNote('');
    } catch (err) {
        console.error("Failed to save note", err);
    }
  };

  const handleDelete = async (noteId) => {
    try {
        await api.delete(`/default-documents/notes/${noteId}`);
        setNotes(notes.filter(n => n.id !== noteId));
    } catch (err) {
        console.error("Failed to delete note", err);
    }
  };

  return (
    <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>My Notes</h3>
      
      <div style={{ marginBottom: '2rem' }}>
          <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={`Add a note for ${activeChapter || 'this document'}...`}
              style={{
                  width: '100%',
                  minHeight: '100px',
                  background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : '#fff',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.2)',
                  color: theme === 'dark' ? '#fff' : '#000',
                  borderRadius: '4px',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
              }}
          />
          <button 
              className="btn btn-primary" 
              onClick={handleSaveNote}
              style={{ width: '100%', padding: '0.5rem' }}
          >
              Save Note
          </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? (
              <p style={{ textAlign: 'center', opacity: 0.5 }}>Loading notes...</p>
          ) : notes.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.5 }}>No notes yet.</p>
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {notes.map(note => (
                      <div key={note.id} style={{
                          background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : '#f8fafc',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
                      }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                                  {note.chapterId === 'general' ? 'General' : note.chapterId}
                              </span>
                              <button 
                                  onClick={() => handleDelete(note.id)}
                                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}
                              >
                                  Delete
                              </button>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                              {note.noteText}
                          </p>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

export default NotesPanel;
