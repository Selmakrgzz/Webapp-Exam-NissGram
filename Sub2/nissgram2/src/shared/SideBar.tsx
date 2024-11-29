import React from 'react';
import ProfileIcon from './../assets/images/profile_image_default.png';
import HomeIcon from './../assets/images/homeIcon.png';
import AddIcon from './../assets/images/addIcon.png';
import LogoutIcon from './../assets/images/logoutIcon.png';

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex">
        <nav className="side-navbar">
            <ul className="nav flex-column text-center flex-grow-1">
                <li className="nav-item mb-3">
                    <a href="/profile" className="nav-link">
                        <div className="profile-container circle">
                            <img src={ProfileIcon} alt="Bildet" className="profile-picture"/> 
                        </div>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a href="/" className="nav-link">
                        <img src={HomeIcon} alt="Home Icon" style={{ height: "40px", width: "40px" }}/>
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <a href="/create" className="nav-link">
                        <img src={AddIcon} alt="Add Post Icon" style={{ height: "40px", width: "40px" }} />
                    </a>
                </li>
            </ul>
            <div className="d-flex align-items-center justify-content-center" style={{height: "100%"}}>
                <button type="submit" className="nav-link text-white p-0 border-0 bg-transparent">
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
