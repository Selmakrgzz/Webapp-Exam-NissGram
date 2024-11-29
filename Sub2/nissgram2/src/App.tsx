import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePost from "./post/createPost"; 
import UpdatePost from "./post/updatePost";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="createPost" element={<CreatePost />} /> {/* Riktig bruk av CreatePost */}
          <Route
            path="/updatePost"
            element={
              <UpdatePost
                postId={123}
                existingImgUrl= " "
                text="This is the current text of the post."
                onUpdate={(postId, updatedText, updatedImage) => {
                  console.log("Updated Post:", { postId, updatedText, updatedImage });
                }}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
