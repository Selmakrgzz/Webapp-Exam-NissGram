import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import NavigationButtons from '../../components/NavigationButtons';
import DynamicContent from '../../components/profile/DynamicContent';
import '../../styles/profilePage.css';

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'Pictures' | 'Notes' | 'LikedPosts'>('Pictures');

  const handleSectionChange = (section: 'Pictures' | 'Notes' | 'LikedPosts') => {
    setActiveSection(section);
  };

  return (
    <div className="container mt-4">
      {/* Profile Header Component */}
      <ProfileHeader />

      {/* Navigation Buttons */}
      <NavigationButtons onSectionChange={handleSectionChange} />

      {/* Dynamic Content */}
      <div className="mt-4">
        <DynamicContent
          section={activeSection}
          data={{
            pictures: [], // Replace with database integration later
            notes: [], // Replace with database integration later
            activities: [], // Replace with database integration later
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
