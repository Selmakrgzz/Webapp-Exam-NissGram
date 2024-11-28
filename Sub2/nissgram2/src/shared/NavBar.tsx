import React from 'react';
import { Link } from 'react-router-dom';
//Navbar og sidebar?
const NavBar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default NavBar;