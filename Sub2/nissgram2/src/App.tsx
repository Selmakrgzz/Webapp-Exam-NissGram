import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePost from "./pages/post/createPost"; 
import UpdatePost from "./pages/post/updatePost";
import AuthorizeView from './pages/auth/AuthorizeView';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route
                  path="/"
                  element={
                      <AuthorizeView>
                          <HomePage />
                      </AuthorizeView>
                  }
            />
          <Route
                  path="/profile"
                  element={
                      <AuthorizeView>
                         <ProfilePage />
                      </AuthorizeView>
                  }
            />
            <Route
                  path="/createPost"
                  element={
                      <AuthorizeView>
                         <CreatePost />
                      </AuthorizeView>
                  }
            />
        
            <Route
                  path="*"
                  element={
                      <AuthorizeView>
                         <NotFoundPage />
                      </AuthorizeView>
                  }
            />
        
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
