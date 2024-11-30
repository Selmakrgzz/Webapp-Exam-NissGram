import React from 'react';
import './../../styles/auth.css'; // CSS-stil for enhetlig design

const LoginPage: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="row w-100" style={{ maxWidth: '800px', transform: 'translateY(-10%)' }}>
        {/* Venstre kolonne med logo */}
        <div className="col-md-5 d-flex align-items-center" style={{ paddingRight: '20px' }}>
          <img
            src={'${API_URL}/images/Logo/Niss.png'}
            alt="Login Illustration"
            className="img-fluid"
            style={{ maxHeight: '400px' }}
          />
        </div>

        {/* Vertikal strek */}
        <div className="col-md-1 d-flex align-items-center justify-content-center">
          <div style={{ borderLeft: '2px solid #ccc', height: '120%' }}></div>
        </div>

        {/* Høyre kolonne med login-skjema */}
        <div className="col-md-6 p-4">
          <h2 className="text-center mb-4">Log in</h2>
          <form id="account" method="post">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="usernameOrEmail"
                placeholder="Enter your username or email"
              />
              <label htmlFor="usernameOrEmail">Username or Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Log in
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