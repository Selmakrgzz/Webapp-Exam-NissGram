import React from 'react';

interface ActivitySectionProps {
  activities: string[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
  return (
    <div>
      <h3>Activity</h3>
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      ) : (
        <p>No activity yet!</p>
      )}
    </div>
  );
};

export default ActivitySection;
