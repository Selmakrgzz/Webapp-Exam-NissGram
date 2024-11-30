import React, { useState } from "react";
import API_URL from "../../apiConfig";

interface PostActionsProps {
  postId: number;
  userLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void; // Legg til dette hvis det mangler
  onCommentClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userLiked: initialUserLiked,
  likeCount: initialLikeCount,
  commentCount,
  onCommentClick,
}) => {
  // State for likes og om brukeren har likt
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = () => {
    // Bytt mellom likt og ikke-likt
    if (userLiked) {
      setLikeCount((prev) => prev - 1); // Fjern en like hvis allerede likt
    } else {
      setLikeCount((prev) => prev + 1); // Legg til en like hvis ikke likt
    }
    setUserLiked(!userLiked); // Oppdater state for userLiked
  };

  return (
    <div className="d-flex align-items-center">
      {/* Like-knappen */}
      <div className="d-flex align-items-center mr-3 like-button-container">
        <button
          onClick={(e) => {
            e.preventDefault(); // Forhindre standard form-oppførsel
            handleLike(); // Håndter likes
          }}
          className="btn p-0"
          style={{ border: "none", background: "transparent" }}
        >
          <img
            src={`${API_URL}/images/Icons/${userLiked ? "heart-red" : "heart"}.png`}
            alt="Like Icon"
            className="like-img me-2"
            style={{ marginLeft: "5px", width: "25px", height: "24px" }}
          />
        </button>
        <span>{likeCount}</span>
      </div>

      {/* Kommentarseksjonen */}
      <div
        className="d-flex align-items-center mr-3 comment-button-container"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#postModal-${postId}`} // Koble modal til riktig post
        onClick={onCommentClick}
      >
        <img
          src={`${API_URL}/images/Icons/chat.png`}
          alt="Comment Icon"
          className="comment_img"
        />
        <span style={{ marginLeft: "5px", width: "25px", height: "24px" }}>
          {commentCount}
        </span>
      </div>
    </div>
  );
};

export default PostActions;
