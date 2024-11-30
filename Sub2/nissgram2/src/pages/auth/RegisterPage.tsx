import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/auth.css'; // Ensure the path to your CSS is correct

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    about: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5024/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
          confirmPassword: userDetails.confirmPassword,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          about: userDetails.about,
          phoneNumber: userDetails.phoneNumber
        })
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || 'Failed to register. Please check your details and try again.');
      }

      // After successful registration, redirect to login
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="registerForm" method="post" encType="multipart/form-data">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-5 fw-bold">Username<span className="text-danger">*</span></label>
          <input type="text" className="form-control" id="username" name="username" value={userDetails.username} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5 fw-bold">Email<span className="text-danger">*</span></label>
          <input type="email" className="form-control" id="email" name="email" value={userDetails.email} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label fs-5 fw-bold">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={userDetails.firstName} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label fs-5 fw-bold">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={userDetails.lastName} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="about" className="form-label fs-5 fw-bold">About</label>
          <textarea className="form-control" id="about" name="about" value={userDetails.about} onChange={handleInputChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label fs-5 fw-bold">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={userDetails.phoneNumber} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5 fw-bold">Password<span className="text-danger">*</span></label>
          <input type="password" className="form-control" id="password" name="password" value={userDetails.password} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fs-5 fw-bold">Confirm Password<span className="text-danger">*</span></label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={userDetails.confirmPassword} onChange={handleInputChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>

        <div className="text-center">
          <p>Already have an account? <a href="/login" style={{ textDecoration: 'underline' }}>Log in here</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
