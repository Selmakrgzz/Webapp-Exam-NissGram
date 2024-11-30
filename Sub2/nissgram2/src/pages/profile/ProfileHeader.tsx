import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CustomDropdown from './CustomDropdown'; // Correct the path as needed
import DefaultProfilePicture from './../../assets/images/profile_image_default.png'; // Import the default profile picture
import '../../styles/profilePage.css';

const ProfileHeader: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = () => {
    // Clear any user-related data (e.g., tokens, user info)
    localStorage.removeItem('authToken'); // Example of clearing a token from local storage

    // Redirect to the login page
    navigate('/login');
  };

  const menuItems = [
    { label: 'Update Profile', action: () => navigate('/update-profile') }, // Navigate to the update profile page
    { label: 'Log Out', action: handleLogout }, // Call handleLogout for the log out action
  ];

  return (
    <div className="profile-header-frame border rounded p-3 mb-4">
      <div className="d-flex justify-content-between align-items-start">
        {/* Profile Picture */}
        <div className="d-flex align-items-center">
          <img
            src={DefaultProfilePicture} // Use the default profile picture
            alt="Profile"
            className="rounded-circle me-5"
            style={{ width: '100px', height: '100px' }}
          />
          <div>
            {/* Username */}
            <div className="username-wrapper">
              <h2 className="mb-4" style={{ color: '#000' }}> {/* Set text color to black */}
                UserName
              </h2>
            </div>
            {/* Picture and Note Count */}
            <p className="mb-4 fs-5" style={{ color: '#000' }}> {/* Set text color to black */}
              <span>0 Pictures</span> | <span>0 Notes</span>
            </p>
            {/* Description */}
            <p className="fs-6 description-text" style={{ color: '#000' }}> {/* Set text color to black */}
              This is a placeholder for the user description. It should wrap and adjust to the frame width.
            </p>
          </div>
        </div>

        {/* Dropdown Menu Component */}
        <CustomDropdown
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          }
          menuItems={menuItems}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
