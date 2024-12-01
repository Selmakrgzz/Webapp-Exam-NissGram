import React from 'react';
import { Post } from '../../types/interfaces';
import PostCard from './../postCard/PostCard';

interface ActivitySectionProps {
  activities: Post[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p>No activity yet!</p>;
  }

  return (
    <div>
      <h3>Activity</h3>
      {/* {activities.map((post) => (
        <PostCard key={post.postId} {...post} currentUserName={post.user?.userName || 'Unknown'} />
      ))} */}
    </div>
  );
};

export default ActivitySection;
