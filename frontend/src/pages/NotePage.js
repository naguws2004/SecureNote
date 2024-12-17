import React, { useState } from 'react';
import Note from '../components/Note';

function NotePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Noteed with:', { email, password });
  };

  return (
    <div>
      <Note 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}

export default NotePage;