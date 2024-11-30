import React from 'react';

interface NotesSectionProps {
  notes: string[];
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  return (
    <div>
      <h3>Notes</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      ) : (
        <p>No notes available!</p>
      )}
    </div>
  );
};

export default NotesSection;
