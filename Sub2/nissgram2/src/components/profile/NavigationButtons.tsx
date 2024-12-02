import React, { useEffect, useRef } from 'react';
import '../../styles/profilePage.css';

interface NavigationButtonsProps {
  onSectionChange: (section: 'Pictures' | 'Notes' | 'LikedPosts') => void;
  hideLikedPosts?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onSectionChange, hideLikedPosts  }) => {
  const picturesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Automatically focus the "Pictures" button when the component loads
    if (picturesButtonRef.current) {
      picturesButtonRef.current.focus();
    }
  }, []);

  return (
    <div className="d-flex justify-content-center my-4">
      <button
        ref={picturesButtonRef} // Attach the ref to the Pictures button
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
      {!hideLikedPosts && <button className="btn btn-primary btn-lg mx-2 w-25" onClick={() => onSectionChange("LikedPosts")}>Liked Posts</button>}
    </div>
  );
};

export default NavigationButtons;
