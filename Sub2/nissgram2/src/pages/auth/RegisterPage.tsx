import React, { useState } from 'react';
import UserProfileForm from '../../components/UserProfileForm';
//import './../../styles/loginRegister.css'; // CSS file for styling


const RegisterPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    about: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted:', userDetails);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="registerForm" method="post" encType="multipart/form-data">
        <h2 className="text-center mb-4">Register</h2>

        {/* User Profile Form */}
        <UserProfileForm
          username={userDetails.username}
          email={userDetails.email}
          firstName={userDetails.firstName}
          lastName={userDetails.lastName}
          about={userDetails.about}
          phoneNumber={userDetails.phoneNumber}
          onInputChange={handleInputChange}
        />

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5 fw-bold">
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={userDetails.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fs-5 fw-bold">
            Confirm Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={userDetails.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Register
        </button>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" style={{ textDecoration: "underline" }}>
              Log in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
