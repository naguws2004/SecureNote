import React, { useState } from 'react';

function Note() {
  const [note, setNote] = useState('');
  const [password, setPassword] = useState('');
  const array = ['Note 1', 'Note 2', 'Note 3', 'Note 4', 'Note 5', 'Note 6', 'Note 7', 'Note 8', 'Note 9', 'Note 10', 'Note 11', 'Note 12', 'Note 13', 'Note 14', 'Note 15', 'Note 16', 'Note 17', 'Note 18', 'Note 19', 'Note 20', 'Note 21', 'Note 22', 'Note 23', 'Note 24', 'Note 25', 'Note 26', 'Note 27', 'Note 28', 'Note 29', 'Note 30', 'Note 31', 'Note 32', 'Note 33', 'Note 34', 'Note 35', 'Note 36', 'Note 37', 'Note 38', 'Note 39', 'Note 40', 'Note 41', 'Note 42', 'Note 43', 'Note 44', 'Note 45', 'Note 46', 'Note 47', 'Note 48', 'Note 49', 'Note 50'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="note">
      <div className="note-list">
        <h2>Notes</h2>
        {array.map((element, index) => (
          <div>
            <a key={index} href="#">{element}</a>
          </div>
        ))}
      </div>
      <div className='note-form'>
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="reset">Clear</button>&nbsp;
                <button type="submit">Create</button>&nbsp;
                <button disabled>Update</button>&nbsp;
                <button disabled>Delete</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Note;