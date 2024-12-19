import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createNote, updateNote, deleteNote, getNotes } from '../services/noteService';
import NoteComponent from '../components/Note';

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [id, setId] = useState(0);
  const [error, setError] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const timeoutRef = useRef(null);
  
  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      const filteredNotes = fetchedNotes.filter(note => note.email === email);
      setNotes(filteredNotes);
      handleReset();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      alert('User is not logged in');
      navigate('/');
      return;
    }
    const user = JSON.parse(userCookie);
    setName(user.name);
    setEmail(user.email);
    fetchNotes();
  }, [email]);

  useEffect(() => {
    const handleActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, 60000); // 1 minute
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    handleActivity(); // Initialize the timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const handleLogout = () => {
    handleReset();
    // Perform any logout logic here, such as clearing user data
    navigate('/', { state: { name: undefined, email: undefined } });
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
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNote = async () => {
    if (!note.trim()) {
      setError('Note cannot be blank');
      return;
    }
    try {
      const noteData = { email: email, note: note };
      await updateNote(id, noteData);
      alert('Note updated successfully');
      // Fetch notes again to update the list
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async () => {
    if (!note.trim()) {
      setError('Note cannot be blank');
      return;
    }
    try {
      await deleteNote(id);
      alert('Note deleted successfully');
      // Fetch notes again to update the list
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
    const selectedNote = notes.find(note => note.id === id);
    setId(selectedNote.id);
    setNote(selectedNote.note);
    setIsUpdateMode(true); // Enable update mode
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
          handleUpdateNote={handleUpdateNote} 
          handleDeleteNote={handleDeleteNote} 
          handleReset={handleReset} 
          handleNoteClick={handleNoteClick}
          isUpdateMode={isUpdateMode}
        />
      </div>
    </div>
  );
}

export default NotePage;