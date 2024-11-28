import React from 'react';
import './../../styles/auth.css'; // Bruk samme CSS for enhetlig stil.
//import logo from '../../assets/images/logo.png';

const RegisterPage: React.FC = () => {
  return (
    <div className="container">
      <form id="registerForm" method="post" encType="multipart/form-data">
        {/* Profile Picture Upload Section */}
        <div className="mb-4 text-center position-relative">
          <div className="fs-5 fw-bold mb-2">Profile Picture</div>
          <div
            id="profileImagePreview"
            className="rounded-circle mx-auto mb-3"
            style={{
              width: '150px',
              height: '150px',
              overflow: 'hidden',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              id="profileImage"
              src="/images/profile_image_default.png"
              alt="Profile Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
          <input
            type="file"
            id="uploadProfilePicture"
            name="uploadImage"
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label fs-5 fw-bold">
            Username
          </label>
          <input type="text" id="username" className="form-control" />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fs-5 fw-bold">
            Email
          </label>
          <input type="email" id="email" className="form-control" />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5 fw-bold">
            Password
          </label>
          <input type="password" id="password" className="form-control" />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fs-5 fw-bold">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" className="form-control" />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Register
        </button>

        <div className="text-center">
          <p>
            Already have an account?{' '}
            <a href="/login" style={{ textDecoration: 'underline' }}>
              Log in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
