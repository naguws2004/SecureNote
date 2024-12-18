import React from 'react';

function Register({ name, setName, email, setEmail, password, setPassword, handleSubmit }) {
  return (
    <div className="Register">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
      <table>
      <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email:</label>
            </td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Password:</label>
            </td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Register</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Register;