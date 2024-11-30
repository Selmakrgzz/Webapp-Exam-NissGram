import React from "react";
import { Post } from "../../types/post";
import PostCard from "./PostCard";

interface AllPostsProps {
  posts: Post[];
}

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.postId} {...post} />
      ))}
    </div>
  );
};

export default AllPosts;
