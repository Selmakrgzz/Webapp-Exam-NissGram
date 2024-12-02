import React from 'react';
import config from '../apiConfig';
import './../styles/layout.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async (event: React.MouseEvent) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://localhost:5024/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            console.log('Logged out successfully');
            // Optionally clear user context or local storage here
            navigate('/login'); // Redirect to login after logout
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

  return (
    <header className="fixed-header">
        <a href="/" >
            <img src={`${config.API_URL}/images/Logo/Niss.png`} alt="NissGram Logo" className="navbar-brand" style={{height: "70px", padding: "5px"}}/>
        </a>

        <nav className="icon-bar">
            <a href="/profile" className="nav-link">
                <div className="profile-container circle">
                    <img src={`${config.API_URL}/images/profile_image_default.png`} className="profile-picture" alt="Profile "/>
                </div>
            </a>
            <a href="/" className="nav-link">
                <img src={`${config.API_URL}/images/Icons/homeIcon.png`} style={{height: "40px", padding: "5px"}} alt="Home "/>
            </a>
            <a href="/createPost" className="nav-link">
                <img src={`${config.API_URL}/images/Icons/addIcon.png`} style={{height: "40px", padding: "5px"}} alt="Add Post "/>
            </a>
            <div className="d-inline nav-link" >
                <button type="submit" onClick={handleLogout} className="nav-link text-white p-0 border-0 bg-transparent">
                    <a href="/logout">
                        <img src={`${config.API_URL}/images/Icons/logoutIcon.png`} style={{height: "40px", padding: "5px"}} alt="Logout "/>
                    </a>
                </button>
            </div>
        </nav>
    </header>
  );
};

export default Header;