import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import NavigationButtons from "../../components/profile/NavigationButtons";
import PostsSection from "../../components/profile/PostsSection";
import { UserProfile} from "../../types/interfaces";
import { getUserProfile } from "../../api/operations";

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"Pictures" | "Notes" | "LikedPosts">("Pictures");
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(); // Call API operation
        const userProfile: UserProfile = {
          username: data.username,
          pictureCount: data.pictureCount,
          noteCount: data.noteCount,
          profilePicture: data.profilePicture,
          about: data.about || "",
          pictures: data.pictures || [],
          notes: data.notes || [],
          likedPosts: data.likedPosts || [],
        };
        setProfileData(userProfile);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSectionChange = (section: "Pictures" | "Notes" | "LikedPosts") => {
    setActiveSection(section);
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!profileData) {
    return <p>Error: No profile data available.</p>;
  }

  return (
    <div className="container mt-4">
         <ProfileHeader
        profilepicture={profileData.profilePicture || "/images/profile_image_default.png"}
        username={profileData.username}
        pictureCount={profileData.pictureCount}
        noteCount={profileData.noteCount}
        about={profileData.about || "No description available"} 
      />
      <NavigationButtons onSectionChange={handleSectionChange} />
      <div className="mt-4">
        <PostsSection activeSection={activeSection} profileData={profileData} />
      </div>
    </div>
  );
};

export default ProfilePage;
