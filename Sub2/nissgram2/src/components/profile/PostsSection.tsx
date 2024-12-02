import React from "react";
import PostCard from "../postCard/PostCard";
import { Post, UserProfile } from "../../types/interfaces";

interface PostsSectionProps {
  activeSection: "Pictures" | "Notes" | "LikedPosts";
  profileData: UserProfile;
  currentUser : string;
}

const PostsSection: React.FC<PostsSectionProps> = ({ activeSection, profileData, currentUser }) => {
  const getPostsForSection = (): Post[] => {
    switch (activeSection) {
      case "Pictures":
        return profileData.pictures;
      case "Notes":
        return profileData.notes;
      case "LikedPosts":
        return profileData.likedPosts;
      default:
        return [];
    }
  };

  const posts = getPostsForSection();

  if (!posts || posts.length === 0) {
    return <p>No posts available in this section.</p>;
  }

  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.postId} className="col-md-4 mb-5">
          <PostCard post={post} currentUserName={currentUser}  />
        </div>
      ))}
    </div>
  );
};

export default PostsSection;
