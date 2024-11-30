import React, { useState } from 'react';
import UserForm from './auth/UserProfileForm';

const UpdateUserPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    firstName: '',
    lastName: '',
    about: '',
    phoneNumber: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log('User details saved:', userDetails);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    console.log('Update canceled.');
    alert('Changes canceled!');
  };

  const handleDeleteAccount = () => {
    console.log('User account deleted.');
    alert('Your account has been deleted.');
  };

  return (
    <div className="container">
      <form id="updateProfileForm">
        <h2 className="text-center mb-4">Update Profile</h2>

        <UserForm
          username={userDetails.username}
          email={userDetails.email}
          firstName={userDetails.firstName}
          lastName={userDetails.lastName}
          about={userDetails.about}
          phoneNumber={userDetails.phoneNumber}
          onInputChange={handleInputChange}
          readOnlyFields={['username', 'email']} // Set username and email to read-only
        />

        <div style={{ textAlign: 'center', marginBottom: '20px', textDecoration: 'underline' }}>
          <a href="/change-password" className="text-primary" style={{ textDecoration: 'none' }}>
            Change your password here
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-success" // Changed to btn-success for green color
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Cancel
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="btn btn-danger"
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Delete your user account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;
