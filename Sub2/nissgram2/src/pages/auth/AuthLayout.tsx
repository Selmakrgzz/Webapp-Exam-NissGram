import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', backgroundColor: '#f8f9fa', width: '100%', textAlign: 'center' }}>
        <h1>NissGram</h1>
      </header>
      <main style={{ flex: 1, width: '100%', maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', backgroundColor: '#f8f9fa', width: '100%', textAlign: 'center' }}>
        <p>&copy; 2024 NissGram</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
