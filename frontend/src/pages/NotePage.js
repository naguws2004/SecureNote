import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNote, getNotes } from '../services/noteService';
import NoteComponent from '../components/Note';

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [id, setId] = useState(0);
  const [error, setError] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email } = location.state || {};
  
  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      alert(email);
      const filteredNotes = fetchedNotes.filter(note => note.email === email);
      setNotes(filteredNotes);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing user data
    navigate('/login');
  };

  const handleCreateNote = async () => {
    if (!note.trim()) {
      setError('Note cannot be blank');
      return;
    }
    try {
      const noteData = { email: email, note: note };
      await createNote(noteData);
      alert('Note created successfully');
      setNote(''); 
      setError('');
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleReset = () => {
    setNote('');
    setError('');
    setId(0);
    setIsUpdateMode(false); // Disable update mode
  };
  
  const handleNoteClick = (id) => {
    alert(`Note ${id} clicked`);
    const selectedNote = notes.find(note => note.id === id);
    setId(selectedNote.id);
    setNote(selectedNote.note);
    setIsUpdateMode(true); // Enable update mode
    alert(JSON.stringify(selectedNote));
  };

  return (
    <div>
      {error && <div className='error'>{error}</div>}
      <div>
        <NoteComponent 
          name={name} 
          notes={notes}
          note={note} 
          setNote={setNote} 
          handleLogout={handleLogout} 
          handleCreateNote={handleCreateNote} 
          handleReset={handleReset} 
          handleNoteClick={handleNoteClick}
          isUpdateMode={isUpdateMode}
        />
      </div>
    </div>
  );
}

export default NotePage;