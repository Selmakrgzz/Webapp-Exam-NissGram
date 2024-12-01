import React, { useEffect, useState } from 'react';
import { Post } from './../types/post';
import PostCard from './postCard/PostCard';
import API_URL from '../apiConfig';

const PicturesSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5024/api/HomeAPI/index", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        // Map data to align with the Post interface
        const enrichedPosts: Post[] = data.map((post: any) => ({
          postId: post.postId,
          imgUrl: post.imgUrl,
          text: post.text,
          dateCreated: new Date(post.dateCreated),
          dateUpdated: new Date(post.dateUpdated),
          user: {
            id: post.userId,
            userName: post.username,
            profilePicture: post.user?.profilePicture || `${API_URL}/images/profile_image_default.png`, // Default profile picture
          },
          userLiked: false, // Adjust based on your logic
          likeCount: post.likeCount,
          commentCount: post.commentCount,
        }));

        setPosts(enrichedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading pictures...</p>;
  }

  if (posts.length === 0) {
    return <p>No pictures available!</p>;
  }

  return (
    <div>
      <h3>Pictures</h3>
      <div className="row">
        {posts.map((post) => (
          <div key={post.postId} className="col-md-4 mb-3">
            <PostCard {...post} currentUserName={post.user?.userName || 'Unknown'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicturesSection;
