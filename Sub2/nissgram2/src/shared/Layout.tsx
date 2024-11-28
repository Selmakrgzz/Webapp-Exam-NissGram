import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
