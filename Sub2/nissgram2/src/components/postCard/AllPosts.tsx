// src/components/postCard/AllPosts.tsx
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Post } from "../../types/interfaces";
import { getCurrentUser } from "../../services/postService";

const AllPosts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { username, error } = await getCurrentUser();
      if (error) {
        setError(error);
      } else {
        setCurrentUser(username);
        setError(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!currentUser) {
    return <p>Error: Could not fetch the current user. Please try again later.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} currentUserName={currentUser} />
      ))}
    </div>
  );
};

export default AllPosts;
