import React, { useState } from 'react';
import Register from '../components/Register';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registered with:', { email, password });
  };

  return (
    <div>
      <Register 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}

export default RegisterPage;