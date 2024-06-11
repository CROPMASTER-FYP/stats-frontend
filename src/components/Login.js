import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tyktyk.pythonanywhere.com/api/dj-rest-auth/login/', {
        username,
        password,
      });
      setToken(response.data.key); // Use response.data.key for dj-rest-auth

      // Fetch user details to get the user ID
      const userResponse = await axios.get('https://tyktyk.pythonanywhere.com/api/dj-rest-auth/user/', {
        headers: {
          'Authorization': `Token ${response.data.key}`
        }
      });

      setUserId(userResponse.data.pk); // Assuming pk is the user ID
      navigate('/my-reports');
      setError(null);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
