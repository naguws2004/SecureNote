import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import LoginComponent from '../components/Login';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await login(email, password);
      setError('');
      console.log(`Name: ${userInfo.Name}`);
      console.log(`Email: ${userInfo.email}`);
      console.log(`Password: ${userInfo.password}`);
      navigate('/note', { state: { name: userInfo.Name, email: userInfo.email } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <div className='error'>{error}</div>}
      <div className="LoginPage">
        <LoginComponent 
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
    </div>
  );
}

export default LoginPage;