import React from "react";

interface PostProfileHeaderProps {
  profilePicture: string;
  userName: string;
  userProfileLink: string; // URL to the user's profile
}

const PostProfileHeader: React.FC<PostProfileHeaderProps> = ({
  profilePicture,
  userName,
  userProfileLink,
}) => {
  return (
    <a
      href={userProfileLink}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="rounded-circle"
            style={{ width: 30, height: 30 }}
          />
          <h5 className="card-title mb-0" style={{ marginLeft: "10px" }}>
            {userName}
          </h5>
        </div>
      </div>
    </a>
  );
};

export default PostProfileHeader;
