import React, { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown';
import API_URL from '../apiConfig';

interface UserProfileFormProps {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  phoneNumber: string;
  profilePicture?: string; // Optional prop for profile picture
  onInputChange: (field: string, value: string) => void;
  readOnlyFields?: string[]; // Optional prop for specifying read-only fields
  onImageChange?: (image: File | null) => void; // Callback for handling image upload
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  username,
  email,
  firstName,
  lastName,
  about,
  phoneNumber,
  profilePicture,
  onInputChange,
  readOnlyFields = [],
  onImageChange,
}) => {
  const [image, setImage] = useState<File | null>(null); // For image
  const [preview, setPreview] = useState<string | null>(
    profilePicture ? `${API_URL}/${profilePicture}` : `${API_URL}/images/profile_image_default.png`
  );

  useEffect(() => {
    if (profilePicture) {
      setPreview(`${API_URL}/${profilePicture}`);
    }
  }, [profilePicture]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (onImageChange) onImageChange(file);
    }
  };

  const menuItems = [
    { label: 'Upload Picture', action: () => document.getElementById('uploadProfilePicture')?.click() },
    { label: 'Delete Picture', action: () => { 
      setImage(null); 
      setPreview(`${API_URL}/images/profile_image_default.png`); 
      if (onImageChange) onImageChange(null); 
    } },
  ];

  return (
    <div>
      {/* Profile Picture Upload Section */}
      <div className="mb-4 text-center position-relative">
        <div className="fs-5 fw-bold mb-2">Profile Picture</div>

        <div
          id="profileImagePreview"
          className="rounded-circle mx-auto mb-3"
          style={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            id="profileImage"
            src={preview || `${API_URL}/images/profile_image_default.png`}            alt="Profile Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>

        <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <CustomDropdown
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            }
            menuItems={menuItems}
          />
        </div>

        <input
          type="file"
          id="uploadProfilePicture"
          name="uploadImage"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      {/* Form Fields */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label fs-5 fw-bold">
          Username<span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => onInputChange('username', e.target.value)}
          readOnly={readOnlyFields.includes('username')}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fs-5 fw-bold">
          Email<span className="text-danger">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => onInputChange('email', e.target.value)}
          readOnly={readOnlyFields.includes('email')}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label fs-5 fw-bold">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          value={firstName}
          onChange={(e) => onInputChange('firstName', e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label fs-5 fw-bold">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          value={lastName}
          onChange={(e) => onInputChange('lastName', e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="about" className="form-label fs-5 fw-bold">
          About
        </label>
        <textarea
          id="about"
          className="form-control"
          value={about}
          onChange={(e) => onInputChange('about', e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label fs-5 fw-bold">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => onInputChange('phoneNumber', e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserProfileForm;

