import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import NavigationButtons from '../../components/NavigationButtons';
import PostCard from '../../components/postCard/PostCard';
import { Post } from '../../types/interfaces';
import API_URL from '../../apiConfig';
import '../../styles/layout.css';

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'Pictures' | 'Notes' | 'LikedPosts'>('Pictures');
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndUser = async () => {
      try {
        // Fetch current user's profile
        const userResponse = await fetch("http://localhost:5024/api/UserAPI/current", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch current user");
        }

        const userData = await userResponse.json();
        setCurrentUserName(userData.username);

        // Fetch all posts
        const response = await fetch("http://localhost:5024/api/HomeAPI/index", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        const enrichedPosts: Post[] = data.map((post: any) => ({
          postId: post.postId,
          imgUrl: post.imgUrl,
          text: post.text,
          dateCreated: new Date(post.dateCreated),
          dateUpdated: new Date(post.dateUpdated),
          user: {
            id: post.userId,
            userName: post.username,
            profilePicture: post.user?.profilePicture || `${API_URL}/images/profile_image_default.png`,
          },
          userLiked: post.userLiked, // Ensure this is mapped correctly
          likeCount: post.likeCount,
          commentCount: post.commentCount,
        }));

        setPosts(enrichedPosts);
      } catch (error) {
        console.error("Error fetching posts or user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndUser();
  }, []);

  const handleSectionChange = (section: 'Pictures' | 'Notes' | 'LikedPosts') => {
    setActiveSection(section);
  };

  const renderSectionContent = () => {
    if (loading) {
      return <p>Loading posts...</p>;
    }

    if (!posts || posts.length === 0) {
      return <p>No posts available!</p>;
    }

    const filteredPosts =
      activeSection === 'Pictures'
        ? posts.filter((post) => post.imgUrl && post.user.userName === currentUserName) // Current user's pictures
        : activeSection === 'Notes'
        ? posts.filter((post) => !post.imgUrl && post.user.userName === currentUserName) // Current user's notes
        : activeSection === 'LikedPosts'
        ? posts.filter((post) => post.userLiked) // Posts liked by the current user
        : [];

    return (
      <div>
        <h3>{activeSection}</h3>
        <div className="row">
          {filteredPosts.map((post) => (
            <div key={post.postId} className="col-md-4 mb-3">
              {/* <PostCard {...post} currentUserName={post.user?.userName || 'Unknown'} /> */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <ProfileHeader />
      <NavigationButtons onSectionChange={handleSectionChange} />
      <div className="mt-4">{renderSectionContent()}</div>
    </div>
  );
};

export default ProfilePage;
