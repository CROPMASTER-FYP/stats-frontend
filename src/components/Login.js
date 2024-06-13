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
      setToken(response.data.key);

      const userResponse = await axios.get('https://tyktyk.pythonanywhere.com/api/user-details/', {
        headers: {
          'Authorization': `Token ${response.data.key}`
        }
      });

      setUserId(userResponse.data.pk);

      const role = userResponse.data.role;

      switch (role) {
        case 'farmer':
          navigate('/farmer/my-orders/');
          break;
        case 'buyer':
          navigate('/buyer/my-orders/');
          break;
        case 'extension_officer':
        default:
          navigate('/my-reports');
          break;
      }

      setError(null);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
    },
    header: {
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      textAlign: 'left',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    paragraph: {
      marginTop: '20px',
      fontSize: '14px',
    },
    link: {
      color: '#4CAF50',
    },
    error: {
      color: 'red',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Log In to Your Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="username" style={styles.label}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >Log In</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.paragraph}>Forgot your password? <a href="/forgotpassword" style={styles.link}>Reset it here</a></p>
      <p style={styles.paragraph}>Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a></p>
      <p style={styles.paragraph}>Back to <a href="/" style={styles.link}>Home</a></p>
    </div>
  );
};

export default Login;
