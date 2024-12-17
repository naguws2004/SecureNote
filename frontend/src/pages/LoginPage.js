import React, { useState } from 'react';
import { BrowserRouter as Routes, Link } from 'react-router-dom';
import Login from '../components/Login';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="LoginPage">
      <Login 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleSubmit={handleSubmit} 
      />
      <br />
      <Link to="/register">
        <button>Go To Registration</button>
      </Link>
    </div>
  );
}

export default LoginPage;