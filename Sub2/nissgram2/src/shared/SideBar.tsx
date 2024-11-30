import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ProfileIcon from './../assets/images/profile_image_default.png';
import HomeIcon from './../assets/images/homeIcon.png';
import AddIcon from './../assets/images/addIcon.png';
import LogoutIcon from './../assets/images/logoutIcon.png';

const Sidebar: React.FC = () => {
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
    <div className="d-flex">
        <nav className="side-navbar">
            <ul className="nav flex-column text-center flex-grow-1">
                <li className="nav-item mb-3">
                    <a href="/profile" className="nav-link">
                        <div className="profile-container circle">
                            <img src={ProfileIcon} className="profile-picture" alt="Profile "/>
                        </div>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a href="/" className="nav-link">
                        <img src={HomeIcon} alt="Home Icon" style={{ height: "40px", width: "40px" }}/>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a href="/createPost" className="nav-link">
                        <img src={AddIcon} alt="Add Post Icon" style={{ height: "40px", width: "40px" }} />
                    </a>
                </li>
            </ul>
            <div className="d-flex align-items-center justify-content-center" style={{height: "100%"}}>
                <button type="submit" onClick={handleLogout} className="text-white p-0 border-0 bg-transparent">
                    <a href="/logout" className="nav-link">
                        <img src={LogoutIcon} alt="Logout Icon" style={{ height: "40px", width: "40px", margin: "15px" }} />
                    </a>
                </button>
            </div>
        </nav>
    </div>
  );
};

export default Sidebar;
