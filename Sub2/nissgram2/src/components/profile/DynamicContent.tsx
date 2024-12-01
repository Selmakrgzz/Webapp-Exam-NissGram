import React from 'react';
/*import PicturesSection from '../PicturesSection';
import NotesSection from '../NotesSection';
import ActivitySection from './ActivitySection';
import PostCard from '../postCard/PostCard'; // Import PostCard
import { Post } from '../../types/post';

type Section = 'Pictures' | 'Notes' | 'LikedPosts';

interface DynamicContentProps {
  section: Section;
  data: {
    pictures: Post[];
    notes: Post[];
    activities: Post[]; // Assume liked posts are provided as Post[]
  };
  currentUserName: string | null; // Pass the current user name
}

const DynamicContent: React.FC<DynamicContentProps> = ({ section, data, currentUserName }) => {
  if (!currentUserName) {
    return <p>Loading...</p>; // Or some placeholder
  }

  switch (section) {
    case 'Pictures':
      return (
        <div>
          <h3>Pictures</h3>
          <div className="row">
            {data.pictures && data.pictures.length > 0 ? (
              data.pictures.map((post) => (
                <div key={post.postId} className="col-md-4 mb-3">
                  <PostCard {...post} currentUserName={currentUserName} />
                </div>
              ))
            ) : (
              <p>No pictures available!</p>
            )}
          </div>
        </div>
      );
    case 'Notes':
      return (
        <div>
          <h3>Notes</h3>
          {data.notes && data.notes.length > 0 ? (
            data.notes.map((post) => (
              <PostCard key={post.postId} {...post} currentUserName={currentUserName} />
            ))
          ) : (
            <p>No notes available!</p>
          )}
        </div>
      );
    case 'LikedPosts':
      return <ActivitySection activities={data.activities || []} />;
    default:
      return null;
  }
};

export default DynamicContent;*/
