import React from 'react';
import PostCard from './postCard/PostCard'; // Import PostCard

import { Post } from './../types/post';


interface NotesSectionProps {
  notes: Post[];
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return <p>No notes available!</p>;
  }

  return (
    <div>
      <h3>Notes</h3>
      {notes.map((post) => (
        <PostCard key={post.postId} {...post} currentUserName={post.user.userName} />
      ))}
    </div>
  );
};

export default NotesSection;
