import React from 'react';
import Logo from './../assets/images/Niss.png';
import ProfileIcon from './../assets/images/profile_image_default.png';
import HomeIcon from './../assets/images/homeIcon.png';
import AddIcon from './../assets/images/addIcon.png';
import LogoutIcon from './../assets/images/logoutIcon.png';

const Header: React.FC = () => {
  return (
    <header className="fixed-header">
        <a href="/" className="navbar-brand">
            <img src={Logo} alt="NissGram Logo" style={{height: "70px", padding: "5px"}}/>
        </a>

        <nav className="icon-bar">
            <a href="/profile" className="nav-link">
                <div className="profile-container circle">
                    <img src={ProfileIcon} className="profile-picture" alt="Profile "/>
                </div>
            </a>
            <a href="/" className="nav-link">
                <img src={HomeIcon} style={{height: "40px", padding: "5px"}} alt="Home "/>
            </a>
            <a href="/create" className="nav-link">
                <img src={AddIcon} style={{height: "40px", padding: "5px"}} alt="Add Post "/>
            </a>
            <div className="d-inline nav-link" >
                <button type="submit" className="nav-link text-white p-0 border-0 bg-transparent">
                    <a href="/logout">
                        <img src={LogoutIcon} style={{height: "40px", padding: "5px"}} alt="Logout "/>
                    </a>
                </button>
            </div>
        </nav>
    </header>
  );
};

export default Header;
