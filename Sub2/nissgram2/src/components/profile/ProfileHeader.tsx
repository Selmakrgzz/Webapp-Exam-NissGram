import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import '../../styles/profilePage.css';
import config from '../../apiConfig';
import { logout } from '../../api/operations';

interface ProfileHeaderProps {
  username: string;
  pictureCount: number;
  noteCount: number;
  about: string;
  profilepicture: string;
  isOwnProfile: boolean; // New prop to determine if it's the logged-in user's profile
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, pictureCount, noteCount, about, profilepicture, isOwnProfile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear user token
    logout();
    navigate('/login'); // Redirect to login
  };

  const menuItems = [
    { label: 'Update Profile', action: () => navigate('/update-profile') },
    { label: 'Log Out', action: handleLogout },
  ];

  return (
    <div className="profile-header-frame border rounded p-3 mb-4">
      <div className="d-flex justify-content-between align-items-start">
        {/* Profile Picture */}
        <div className="d-flex align-items-center">
          <img
            src={
              profilepicture
                ? `${config.BACKEND_URL}${profilepicture}` // Use profile picture from the backend URL
                : `${config.BACKEND_URL}${config.DEFAULT_IMAGE_PATH}` // Use default profile picture
            }
            alt="Profile"
            className="rounded-circle me-5"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div>
            {/* Username */}
            <h2 className="mb-4" style={{ color: '#000' }}>
              {username || 'Guest'}
            </h2>

            {/* Picture and Note Count */}
            <p className="mb-4 fs-5" style={{ color: '#000' }}>
              <span>{pictureCount} Pictures</span> | <span>{noteCount} Notes</span>
            </p>

            {/* About */}
            <p className="fs-6 description-text" style={{ color: '#000' }}>
              {about || 'No description available.'}
            </p>
          </div>
        </div>

        {/* Conditional Rendering of Dropdown */}
        {isOwnProfile && (
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
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
