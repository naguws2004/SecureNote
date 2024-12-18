import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterComponent from '../components/Register';
import { validateEmail } from '../utils/helper';
import { register } from '../services/authService';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be blank');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!password.trim()) {
      setError('Password cannot be blank');
      return;
    }
    try {
      await register(name, email, password);
      setError('');
      // show success message
      console.log('Registered with:', { name, email, password });
      alert('Registered successfully');
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <div className='error'>{error}</div>}
      <div>
        <RegisterComponent 
          name={name} 
          setName={setName} 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          handleSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}

export default RegisterPage;