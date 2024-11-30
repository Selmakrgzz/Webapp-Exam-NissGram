import React from 'react';
import '../../styles/profilePage.css';

interface NavigationButtonsProps {
  onSectionChange: (section: 'Pictures' | 'Notes' | 'LikedPosts') => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onSectionChange }) => {
  return (
    <div className="d-flex justify-content-center my-4">
      <button
        className="btn btn-primary btn-lg mx-2 w-25"
        onClick={() => onSectionChange('Pictures')}
      >
        Pictures
      </button>
      <button
        className="btn btn-primary btn-lg mx-2 w-25"
        onClick={() => onSectionChange('Notes')}
      >
        Notes
      </button>
      <button
        className="btn btn-primary btn-lg mx-2 w-25"
        onClick={() => onSectionChange('LikedPosts')}
      >
        Activity
      </button>
    </div>
  );
};

export default NavigationButtons;
