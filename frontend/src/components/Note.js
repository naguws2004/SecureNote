import React from 'react';

function Note({ name, notes, note, setNote, handleLogout, handleCreateNote, handleUpdateNote, handleDeleteNote, handleReset, handleNoteClick, isUpdateMode }) {
  return (
    <div className="note">
      <div className="note-list">
        <h2>Notes</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((element, index) => (
            <div style={{ cursor: 'pointer', textDecoration: 'underline' }} key={element.id} onClick={() => handleNoteClick(element.id)}>
              Note {element.id}
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
      <div className='note-form'>
        <div className='note-form-header'>
          <span>Hello {name}!</span>&nbsp;
          <button type="logout" onClick={handleLogout}>Logout</button>
        </div>
        <table>
          <tr>
            <td>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your note here..."
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleReset}>Reset</button>&nbsp;
              <button onClick={handleCreateNote} disabled={isUpdateMode}>Create</button>&nbsp;
              <button onClick={handleUpdateNote} disabled={!isUpdateMode}>Update</button>&nbsp;
              <button onClick={handleDeleteNote} disabled={!isUpdateMode}>Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Note;