import React, { useState } from 'react';
import './../../styles/auth.css'; // CSS-stil for enhetlig design
import NissGramLogo from './../../assets/images/Niss.png';
import { useNavigate} from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5024/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setError(''); // Clear any previous errors
        navigate('/'); 
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="row w-100" style={{ maxWidth: '800px', transform: 'translateY(-10%)' }}>
        {/* Venstre kolonne med logo */}
        <div className="col-md-5 d-flex align-items-center" style={{ paddingRight: '20px' }}>
          <img src={NissGramLogo} alt="Login Illustration" className="img-fluid" style={{ maxHeight: '400px' }} />
        </div>
        {/* Høyre kolonne med login-skjema */}
        <div className="col-md-6 p-4">
          <h2 className="text-center mb-4">Log in</h2>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="usernameOrEmail"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="usernameOrEmail">Username or Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <div className="text-center">
              <p>
                <a href="/register" className="btn btn-secondary w-100 mb-3">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
