import React from 'react';
import API_URL from '../apiConfig';
import './../styles/layout.css';

const Header: React.FC = () => {
  return (
    <header className="fixed-header">
        <a href="/" >
            <img src={`${API_URL}/images/Logo/Niss.png`} alt="NissGram Logo" className="navbar-brand" style={{height: "70px", padding: "5px"}}/>
        </a>

        <nav className="icon-bar">
            <a href="/profile" className="nav-link">
                <div className="profile-container circle">
                    <img src={`${API_URL}/images/profile_image_default.png`} className="profile-picture" alt="Profile "/>
                </div>
            </a>
            <a href="/" className="nav-link">
                <img src={`${API_URL}/images/Icons/homeIcon.png`} style={{height: "40px", padding: "5px"}} alt="Home "/>
            </a>
            <a href="/createPost" className="nav-link">
                <img src={`${API_URL}/images/Icons/addIcon.png`} style={{height: "40px", padding: "5px"}} alt="Add Post "/>
            </a>
            <div className="d-inline nav-link" >
                <button type="submit" className="nav-link text-white p-0 border-0 bg-transparent">
                    <a href="/logout">
                        <img src={`${API_URL}/images/Icons/logoutIcon.png`} style={{height: "40px", padding: "5px"}} alt="Logout "/>
                    </a>
                </button>
            </div>
        </nav>
    </header>
  );
};

export default Header;